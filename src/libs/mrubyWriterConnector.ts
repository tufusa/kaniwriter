import { WritableStreamDefaultWriter } from "stream/web";
import { Result, Success, Failure } from "./result";

export const targets = ["ESP32", "RBoard"] as const;
export type Target = (typeof targets)[number];

type Logger = (message?: any, ...params: any[]) => void;
type Listener = (buffer: string[]) => void;

type Reader = ReadableStreamDefaultReader<Uint8Array>;
type Writer = WritableStreamDefaultWriter<Uint8Array>;
type Event = "AttemptToEnterWriteMode" | "SuccessToExitWriteMode";
type Job = { job: Promise<any>; description: string };

const baudRates: Record<Target, number> = {
  ESP32: 115200,
  RBoard: 19200,
} as const;

export class MrubyWriterConnector {
  private port: SerialPort | undefined;
  private log: Logger;
  private onListen: Listener | undefined;
  private subReadable: ReadableStream<Uint8Array> | undefined;
  private _writeMode: boolean;
  private encoder: TextEncoder;
  private decoder: TextDecoder;
  private buffer: string[];
  private target: Target | undefined;
  private currentSubReader: Reader | undefined;
  private jobQueue: Job[];
  readonly useAnsi: boolean;

  constructor(config: {
    target?: Target;
    log: Logger;
    onListen?: Listener;
    useAnsi?: boolean;
  }) {
    this.target = config.target;
    this.log = config.log;
    this.onListen = config.onListen;
    this.useAnsi = config.useAnsi ?? false;
    this.buffer = [];
    this._writeMode = false;
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
    this.jobQueue = [];
  }

  public get writeMode(): boolean {
    return this._writeMode;
  }

  setTarget(target: Target) {
    this.target = target;
  }

  async connect(port: () => Promise<SerialPort>): Promise<Result<null, Error>> {
    if (this.port) {
      return Failure.error("Already connected.");
    }

    try {
      this.handleText("\r\n\u001b[32m> try to connect...\u001b[0m\r\n");
      this.port = await port();
      const res = await this.open();
      if (res.isFailure()) {
        this.port = undefined;
        this.handleText(
          "\r\n\u001b[31m> failed to open serial port.\u001b[0m\r\n"
        );
        return Failure.error("Failed to open serial port.");
      }

      this.handleText("\r\n\u001b[32m> connection established\u001b[0m\r\n");
      return Success.value(null);
    } catch (error) {
      this.port = undefined;
      this.handleText("\r\n\u001b[31m> failed to connact.\u001b[0m\r\n");
      return Failure.error("Cannot get serial port.", { cause: error });
    }
  }

  async startListen(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
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
      const log = this.log;
      const handleEvent = (event: Event | null) => this.handleEvent(event);
      const decodeStream = new TransformStream<Uint8Array, string>({
        transform(chunk, controller) {
          controller.enqueue(decode(chunk));
        },
      });
      const logStream = new WritableStream<string>({
        async write(chunk) {
          log("Received", { chunk });

          const event = handleText(chunk);
          if (event.value.event) log("Event detected", event.value);

          const res = await handleEvent(event.value.event);
          if (res) log("Event handled", res);
        },
      });

      mainReadable.pipeThrough(decodeStream).pipeTo(logStream);

      while (this.port.readable) {
        this.currentSubReader = subReadable.getReader();
        await this.read(this.currentSubReader);
        await this.completeJobs();
        this.currentSubReader.releaseLock();
      }
    } catch (error) {
      return Failure.error("Error excepted while reading.", { cause: error });
    } finally {
      this.currentSubReader?.releaseLock();
      await this.close();
    }

    return Failure.error("Reader is canceled.");
  }

  async sendCommand(command: string): Promise<Result<string, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this._writeMode) {
      return Failure.error("Not write mode now.");
    }

    await this.completeJobs();

    this.handleText(`\r\n> ${command}\r\n`);
    console.log("Send", { command });

    return await this.sendData(this.encoder.encode(command));
  }

  async writeCode(
    binary: Uint8Array,
    option?: { execute: boolean }
  ): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this._writeMode) {
      return Failure.error("Not write mode now.");
    }

    await this.completeJobs();

    const clearRes = await this.sendCommand("clear");
    if (clearRes.isFailure()) return clearRes;

    console.log(clearRes);
    const writeSizeRes = await this.sendCommand(`write ${binary.byteLength}`);
    if (writeSizeRes.isFailure()) return writeSizeRes;

    const writeRes = await this.sendData(binary);
    if (writeRes.isFailure()) return writeRes;

    if (option?.execute) {
      await this.sendCommand("execute");
    }

    return Success.value(null);
  }

  private async sendData(chunk: Uint8Array): Promise<Result<string, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }

    const send = new Promise<Result<string, Error>>(async (resovle, reject) => {
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

      const request = await this.write(writer, chunk);
      if (request.isFailure()) {
        reject(request);
        return;
      }

      const response = await this.readLine(this.currentSubReader);
      if (response.isFailure()) {
        reject(response);
        return;
      }
      if (!response.value.startsWith("+")) {
        reject(
          Failure.error("Failed to enter write mode.", { cause: response })
        );
        return;
      }

      resovle(response);

      this.currentSubReader.releaseLock();
      writer.releaseLock();
    });

    this.jobQueue.push({ job: send, description: "send data" });
    return await send;
  }

  private async completeJobs() {
    for (const job of this.jobQueue) {
      try {
        this.log("Job await:", `"${job.description}"`);
        const res = await job.job;
        this.log("Job succeeded", res);
      } catch (error) {
        this.log("Job failed", error);
      }
    }
    this.jobQueue = [];
  }

  private async open(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (!this.target) {
      return Failure.error("No target selected.");
    }

    try {
      await this.port.open({ baudRate: baudRates[this.target] });
      return Success.value(null);
    } catch (error) {
      return Failure.error("Failed to open serial port.", { cause: error });
    }
  }

  private async close(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }

    try {
      await this.port.close();
      return Success.value(null);
    } catch (error) {
      return Failure.error("Failed to close serial port.", { cause: error });
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
    const event = this.detectEvent(texts.join()).value.event;
    this.buffer.push(...texts);
    this.onListen?.(this.buffer);
    return Success.value({ event });
  }

  private async handleEvent(
    event: Event | null
  ): Promise<Result<null, Error> | null> {
    if (event === "AttemptToEnterWriteMode") {
      return this.onAttemptEnterWriteMode();
    }
    if (event === "SuccessToExitWriteMode") {
      return this.onExitWriteMode();
    }
    return null;
  }

  private detectEvent(text: string): Success<{ event: Event | null }> {
    if (
      text.includes("mrubyc-esp32: Please push Enter key x 2 to mrbwite mode")
    ) {
      return Success.value({ event: "AttemptToEnterWriteMode" });
    }
    if (text.includes("mrubyc-esp32: End mrbwrite mode")) {
      return Success.value({ event: "SuccessToExitWriteMode" });
    }

    return Success.value({ event: null });
  }

  private async onAttemptEnterWriteMode(): Promise<Result<null, Error>> {
    if (!this.port) {
      return Failure.error("No port.");
    }
    if (this._writeMode) {
      return Failure.error("Already write mode.");
    }
    if (!this.subReadable) {
      return Failure.error("Cannot read serial port.");
    }
    if (!this.port.writable) {
      return Failure.error("Cannot write serial port.");
    }

    const enter = new Promise<Result<null, Error>>(async (resolve, reject) => {
      const response = await this.sendData(this.encoder.encode("\r\n\r\n"));
      if (response.isFailure()) {
        reject(response);
        return;
      }
      if (!response.value.includes("+OK mruby/c")) {
        reject(Failure.error("Cannot enter write mode"));
        return;
      }

      this._writeMode = true;
      resolve(Success.value(null));
    });

    this.jobQueue.push({
      job: enter,
      description: "attempt to enter write mode",
    });
    return await enter;
  }

  private async onExitWriteMode(): Promise<Success<null>> {
    this._writeMode = false;
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

  private async write(
    writer: Writer,
    chunk: Uint8Array
  ): Promise<Result<null, Error>> {
    try {
      await writer.ready;
      await writer.write(chunk);
      this.log("Writed", { chunk });

      return Success.value(null);
    } catch (error) {
      return Failure.error("Error excepted while writing.", { cause: error });
    }
  }

  private async readLine(reader: Reader): Promise<Result<string, Error>> {
    let line = "";
    while (true) {
      const res = await this.read(reader);
      if (res.isFailure()) return res;

      line += res.value;

      if (line.endsWith("\r\n")) {
        return Success.value(line);
      }
    }
  }
}
