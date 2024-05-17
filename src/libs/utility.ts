import { Target, targets } from "./mrubyWriterConnector";

export const isTarget = (value: string): value is Target => {
  return (targets as readonly string[]).includes(value);
};
