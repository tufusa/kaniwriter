//CRC8を計算する. 初期値0xff, 多項式:x^8 + x^5 + x^4 + 1
//参考:https://qiita.com/jamjam/items/7a3b80affe5ba6ecdead
export const calculateCrc8 = (data: Uint8Array): number => {
  const poly = 0x31;
  const hash = data?.reduce((crc, byte) => {
    crc ^= byte;
    for (let i = 8; i > 0; --i) {
      if (crc & 0x80) {
        crc = (crc << 1) ^ poly;
      } else {
        crc = crc << 1;
      }
    }
    crc &= 0xff;
    return crc;
  }, 0xff);
  return hash;
};
