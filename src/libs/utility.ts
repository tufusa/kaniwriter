import { Target, targets } from "./mrubyWriterConnector"

export const isTarget = (object: any): object is Target => {
  return targets.includes(object);
}