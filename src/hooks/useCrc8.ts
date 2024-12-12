import { useMemo } from "react";
import { crc8Calculator } from "../utils/crc8Calculator";

export const useCrc8 = (data?: Uint8Array) => {
  const crc8 = useMemo(() => crc8Calculator(data), [data]);

  return crc8;
};
