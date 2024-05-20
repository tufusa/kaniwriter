export type Result<T, E extends Error> = Success<T> | Failure<E>;

interface IResult {
  isSuccess(): this is Success<unknown>;
  isFailure(): this is Failure<Error>;
}

export class Success<T> implements IResult {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isSuccess(): this is Success<T> {
    return true;
  }

  isFailure(): this is Failure<never> {
    return false;
  }

  static value<T>(value: T): Success<T> {
    return new Success<T>(value);
  }
}

export class Failure<E extends Error> implements IResult {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }

  isSuccess(): this is Success<never> {
    return false;
  }

  isFailure(): this is Failure<E> {
    return true;
  }

  static error(
    message: string,
    options: ErrorOptions | undefined = undefined
  ): Failure<Error> {
    return new Failure<Error>(new Error(message, options));
  }
}
