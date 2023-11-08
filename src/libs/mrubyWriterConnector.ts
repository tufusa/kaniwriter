import { WritableStreamDefaultWriter } from "stream/web";
import { Result, Success, Failure } from "./result";

export type Target = "ESP32" | "RBoard";

export type Logger = (message: string) => void;
export type Listener = (message: string, buffer: string[]) => void;
export type Unsubscribe = () => void;

type Reader = ReadableStreamDefaultReader<Uint8Array>;
type Writer = WritableStreamDefaultWriter<Uint8Array>;
type Event = "AttenptToEnterWriteMode" | "SuccessToExitWriteMode";

export class MrubyWriterConnector {
  private port: SerialPort | undefined;
  private logger: Logger;
  private onListen: Listener | undefined;
  private reader: Reader | undefined;
  private writer: Writer | undefined;
  private writeMode: Boolean;
  private encoder: TextEncoder;
  private decoder: TextDecoder;
  private buffer: string[];

  readonly target: Target;

  constructor(
    target: Target,
    logger: Logger,
    onListen: Listener | undefined = undefined
  ) {
    this.target = target;
    this.logger = logger;
    this.onListen = onListen;
    this.buffer = [];
    this.writeMode = false;
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  setListener(onListen: Listener): Unsubscribe {
    this.onListen = onListen;
    return () => (this.onListen = undefined);
  }

  async connect(port: () => Promise<SerialPort>): Promise<Result<null, Error>> {
    try {
      this.port = await port();
      return new Success(null);
    } catch (error) {
      return new Failure(
        new Error("Cannot get serial port.", { cause: error })
      );
    }
  }

  async open(): Promise<Result<null, Error>> {
    try {
      await this.port!.open({ baudRate: 115200 });
      return new Success(null);
    } catch (error) {
      return new Failure(
        new Error("Cannot open serial port.", { cause: error })
      );
    }
  }

  async close(): Promise<Result<null, Error>> {
    try {
      await this.port!.close();
      return new Success(null);
    } catch (error) {
      return new Failure(
        new Error("Cannot close serial port.", { cause: error })
      );
    }
  }

  async startListen(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }

    const res = await this.open();
    if (res.isFailure()) {
      return res;
    }
    if (!this.port.readable) {
      return Failure.error("Cannot read serial port.");
    }
    if (!this.port.writable) {
      return Failure.error("Cannot write serial port.");
    }

    while (this.port.readable && this.port.writable) {
      this.reader = this.port.readable.getReader();
      this.writer = this.port.writable.getWriter();
      try {
        while (true) {
          const { done, value } = await this.reader.read();
          if (done) {
            return Failure.error("Reader canceled.");
          }
          const text = this.decoder.decode(value);
          const textRes = this.handleText(text);
          await this.handleEvent(textRes.value.event);
        }
      } catch (error) {
        console.log(
          new Error("Error excepted while reading.", { cause: error })
        );
      }
    }

    this.reader?.releaseLock();
    this.writer?.releaseLock();
    this.close();
    return Failure.error("Reader or writer canceled.");
  }

  async enterWriteMode(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.port.readable || !this.reader) {
      return Failure.error("Cannot read serial port.");
    }
    if (!this.port.writable || !this.writer) {
      return Failure.error("Cannot write serial port.");
    }

    const ret = this.encoder.encode("\r\n");
    await this.writer.write(ret);
    await this.writer.write(ret);
    const response = await this.checkSuccessEnter();

    if (response.isFailure()) {
      return Failure.error("Cannot enter write mode", {
        cause: response.error,
      });
    }

    this.writeMode = true;
    return new Success(null);
  }

  async exitWriteMode(): Promise<Success<null>> {
    this.writeMode = false;
    return new Success(null);
  }

  async sendCommand(command: string): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.port.readable || !this.reader) {
      return Failure.error("Cannot read serial port.");
    }
    if (!this.port.writable || !this.writer) {
      return Failure.error("Cannot write serial port.");
    }
    if (!this.writeMode) {
      return Failure.error("Not write mode now.");
    }

    try {
      await this.writer.write(this.encoder.encode(command));
      const description = `\r\n> ${command}\r\n`;
      this.handleText(description);

      return new Success(null);
    } catch (error) {
      return Failure.error("Error excepted while sending.", { cause: error });
    }
  }

  async checkSuccessEnter(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.port.readable || !this.reader) {
      return Failure.error("Cannot read serial port.");
    }

    let line = "";
    try {
      while (true) {
        const { done, value } = await this.reader.read();
        if (done) {
          return Failure.error("Reader is canceled.");
        }

        const fragment = this.decoder.decode(value);
        this.handleText(fragment);
        line += fragment;

        if (line.endsWith("+OK mruby/c \r\n\r\n")) {
          return new Success(null);
        }
      }
    } catch (error) {
      return Failure.error("Error excepted while reading.", { cause: error });
    }
  }

  private handleText(text: string): Success<{ event: Event | null }> {
    const last_text = this.buffer.pop() ?? "";
    const texts = (last_text + text).split("\r\n");
    const event = this.findEvent(texts).value.event;

    this.buffer.push(...texts);
    this.logger(text);
    this.onListen?.(text, this.buffer);
    return new Success({ event });
  }

  private async handleEvent(
    event: Event | null
  ): Promise<Result<null, Error> | null> {
    if (event === "AttenptToEnterWriteMode") {
      return this.enterWriteMode();
    }
    if (event === "SuccessToExitWriteMode") {
      return this.exitWriteMode();
    }
    return null;
  }

  private findEvent(texts: string[]): Success<{ event: Event | null }> {
    const text = texts.join();

    if (
      text.includes("mrubyc-esp32: Please push Enter key x 2 to mrbwite mode")
    ) {
      return new Success({ event: "AttenptToEnterWriteMode" });
    }
    if (text.includes("mrubyc-esp32: End mrbwrite mode")) {
      return new Success({ event: "SuccessToExitWriteMode" });
    }

    return new Success({ event: null });
  }
}
