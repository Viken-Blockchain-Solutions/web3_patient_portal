export function getRandomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value.");
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("Minimum and maximum values must be integers.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function truncateString(str: string): string {
  const startChars = 4;
  const endChars = 4;
  if (str.length <= startChars + endChars) {
    return str;
  }

  const start = str.substring(0, startChars);
  const end = str.substring(str.length - endChars);

  return `${start}…….${end}`;
}

export const generateNonce = (): string => {
  const nonce = Math.floor(100000 + Math.random() * 900000);
  return nonce.toString();
};
