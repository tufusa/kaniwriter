import { WritableStreamDefaultWriter } from "stream/web";
import { Result, Success, Failure } from "./result";

export type Target = "ESP32" | "RBoard";

export type Logger = (message: string) => void;
export type Listener = (message: string, buffer: string[]) => void;
export type Unsubscribe = () => void;

type Reader = ReadableStreamDefaultReader<Uint8Array>;
type Writer = WritableStreamDefaultWriter<Uint8Array>;
type Event =
  | "AttemptToEnterWriteMode"
  | "SuccessToExitWriteMode"
  | "AttemptToWriteCode";

export class MrubyWriterConnector {
  private port: SerialPort | undefined;
  private logger: Logger;
  private onListen: Listener | undefined;
  private subReadable: ReadableStream<Uint8Array> | undefined;
  private writeMode: Boolean;
  private encoder: TextEncoder;
  private decoder: TextDecoder;
  private buffer: string[];

  readonly target: Target;

  private currentSubReader: Reader | undefined;
  private jobQueue: Promise<any>[];

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
    this.jobQueue = [];
  }

  async connect(port: () => Promise<SerialPort>): Promise<Result<null, Error>> {
    try {
      this.port = await port();
      return Success.value(null);
    } catch (error) {
      return Failure.error("Cannot get serial port.", { cause: error });
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

    try {
      const [mainReadable, subReadable] = this.port.readable.tee();
      this.subReadable = subReadable;
      const decode = (data: Uint8Array) => this.decoder.decode(data);
      const handleText = (text: string) => this.handleText(text);
      const handleEvent = (event: Event | null) => this.handleEvent(event);

      mainReadable
        .pipeThrough(
          new TransformStream<Uint8Array, string>({
            transform(chunk, controller) {
              controller.enqueue(decode(chunk));
            },
          })
        )
        .pipeTo(
          new WritableStream<string>({
            async write(chunk) {
              const event = handleText(chunk);
              const res = await handleEvent(event.value.event);
              console.log(res);
            },
          })
        );

      while (true) {
        this.currentSubReader = subReadable.getReader();
        await this.read(this.currentSubReader);
        await this.executeJobs();
        this.currentSubReader.releaseLock();
      }
    } catch (error) {
      return Failure.error("Error excepted while reading1.", { cause: error });
    } finally {
      await this.close();
    }
  }

  async executeJobs() {
    for (const job of this.jobQueue) {
      console.log(job);
      const res = await job;
      console.log({ jobRes: res });
    }
    this.jobQueue = [];
  }

  async sendCommand(
    command: string | Uint8Array,
    option: { verbose: boolean } = { verbose: true }
  ): Promise<Result<string, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.writeMode) {
      return Failure.error("Not write mode now.");
    }

    const send = new Promise<Result<string, Error>>(async (resolve, reject) => {
      console.log("awaited!");
      const readerRes = this.getSubReader();
      const writerRes = this.getWriter();
      if (readerRes.isFailure()) {
        reject(readerRes);
        return;
      }
      if (writerRes.isFailure()) {
        reject(writerRes);
        return;
      }

      this.currentSubReader = readerRes.value;
      const writer = writerRes.value;

      try {
        const bin =
          typeof command === "string" ? this.encoder.encode(command) : command;

        await writer.ready;
        await writer.write(bin);

        if (option.verbose) {
          this.handleText(`\r\n> ${command}\r\n`);
        }

        const response = await this.readLine(this.currentSubReader);
        if (response.isFailure()) {
          reject(
            Failure.error("Failed to read response.", {
              cause: response.error,
            })
          );
          return;
        }
        if (!response.value.startsWith("+")) {
          reject(Failure.error("Command failed."));
          return;
        }

        resolve(response);
      } catch (error) {
        reject(
          Failure.error("Error excepted while sending.", { cause: error })
        );
      } finally {
        this.currentSubReader.releaseLock();
        writer.releaseLock();
      }
    });

    this.jobQueue.push(send);
    return await send;
  }

  async writeCode(binary: Uint8Array): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.writeMode) {
      return Failure.error("Not write mode now.");
    }

    const write = new Promise<Result<null, Error>>(async (resolve, reject) => {
      const clearRes = await this.sendCommand("clear");
      if (clearRes.isFailure()) {
        reject(clearRes);
        return;
      }

      const writeSizeRes = await this.sendCommand(`write ${binary.byteLength}`);
      if (writeSizeRes.isFailure()) {
        reject(writeSizeRes);
        return;
      }
      console.log({ aaaa: writeSizeRes });

      const writeRes = await this.sendCommand(binary, { verbose: false });
      if (writeRes.isFailure()) {
        reject(writeRes);
        return;
      }

      resolve(Success.value(null));
    });

    this.jobQueue.push(write);
    return await write;
  }

  private async open(): Promise<Result<null, Error>> {
    try {
      await this.port!.open({ baudRate: 115200 });
      return Success.value(null);
    } catch (error) {
      return Failure.error("Cannot open serial port.", { cause: error });
    }
  }

  private async close(): Promise<Result<null, Error>> {
    try {
      await this.port!.close();
      return Success.value(null);
    } catch (error) {
      return Failure.error("Cannot close serial port.", { cause: error });
    }
  }

  private getSubReader(): Result<Reader, Error> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.subReadable) {
      return Failure.error("Cannot read serial port.");
    }

    try {
      console.log("get reader");
      this.currentSubReader?.releaseLock();
      return Success.value(this.subReadable.getReader());
    } catch (error) {
      return Failure.error("Failed to get reader.", { cause: error });
    }
  }

  private getWriter(): Result<Writer, Error> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.port.writable) {
      return Failure.error("Cannot write serial port.");
    }

    try {
      return Success.value(this.port.writable.getWriter());
    } catch (error) {
      return Failure.error("Failed to get writer.", { cause: error });
    }
  }

  private handleText(text: string): Success<{ event: Event | null }> {
    const last_text = this.buffer.pop() ?? "";
    const texts = (last_text + text).split("\r\n");
    const event = this.detectEvent(texts).value.event;
    this.buffer.push(...texts);
    this.logger(text);
    this.onListen?.(text, this.buffer);
    return Success.value({ event });
  }

  private async handleEvent(
    event: Event | null
  ): Promise<Result<null, Error> | null> {
    if (event === "AttemptToEnterWriteMode") {
      return this.onEnterWriteMode();
    }
    if (event === "SuccessToExitWriteMode") {
      return this.onExitWriteMode();
    }
    return null;
  }

  private detectEvent(texts: string[]): Success<{ event: Event | null }> {
    const text = texts.join();
    if (
      text.includes("mrubyc-esp32: Please push Enter key x 2 to mrbwite mode")
    ) {
      return Success.value({ event: "AttemptToEnterWriteMode" });
    }
    if (text.includes("mrubyc-esp32: End mrbwrite mode")) {
      return Success.value({ event: "SuccessToExitWriteMode" });
    }
    if (text.includes("+OK writting to slave.mrbc")) {
      return Success.value({ event: "AttemptToWriteCode" });
    }
    return Success.value({ event: null });
  }

  private async onEnterWriteMode(): Promise<Result<null, Error>> {
    console.log("enter");
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (this.writeMode) {
      return Failure.error("Already write mode.");
    }
    if (!this.subReadable) {
      return Failure.error("Cannot read serial port.");
    }
    if (!this.port.writable) {
      return Failure.error("Cannot write serial port.");
    }
    console.log("try");

    const enter = new Promise<Result<null, Error>>(async (resolve, reject) => {
      console.log("enter awaited!");
      const readerRes = this.getSubReader();
      const writerRes = this.getWriter();
      if (readerRes.isFailure()) {
        reject(readerRes);
        return;
      }
      if (writerRes.isFailure()) {
        reject(writerRes);
        return;
      }

      const reader = readerRes.value;
      const writer = writerRes.value;
      console.log("ready");
      try {
        await writer.ready;
        await writer.write(this.encoder.encode("\r\n\r\n"));
        const response = await this.readLine(reader);
        console.log(response);
        if (response.isFailure()) {
          reject(
            Failure.error("Cannot enter write mode", {
              cause: response.error,
            })
          );
          return;
        }
        if (!response.value.includes("+OK mruby/c")) {
          reject(Failure.error("Cannot enter write mode"));
          return;
        }

        this.writeMode = true;
        resolve(Success.value(null));
      } catch (error) {
        this.writeMode = false;
        reject(
          Failure.error(
            "Error excepted while attempting to enter write mode.",
            { cause: error }
          )
        );
      } finally {
        reader.releaseLock();
        writer.releaseLock();
      }
    });

    this.jobQueue.push(enter);
    return await enter;
  }

  private async onExitWriteMode(): Promise<Success<null>> {
    this.writeMode = false;
    return Success.value(null);
  }

  private async read(reader: Reader): Promise<Result<string, Error>> {
    try {
      const { done, value } = await reader.read();
      if (done) {
        return Failure.error("Reader is canceled.");
      }

      return Success.value(this.decoder.decode(value));
    } catch (error) {
      return Failure.error("Error excepted while reading.", { cause: error });
    }
  }

  private async readLine(reader: Reader): Promise<Result<string, Error>> {
    let line = "";
    try {
      while (true) {
        console.log({ lb: line });
        const res = await this.read(reader);
        if (res.isFailure()) return res;

        line += res.value;
        console.log({ line });

        if (line.endsWith("\r\n\r\n")) {
          return Success.value(line);
        }
      }
    } catch (error) {
      return Failure.error("Error excepted while reading.", { cause: error });
    }
  }
}
