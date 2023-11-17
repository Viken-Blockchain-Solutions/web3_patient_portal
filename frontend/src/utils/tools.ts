export function getRandomNumber(): number {
  return Math.floor(Math.random() * 201) + 50;
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

