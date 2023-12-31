/**
 * Generates a random number between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value for the random number.
 * @param {number} max - The maximum value for the random number.
 * @throws {Error} If the minimum value is greater than the maximum value.
 * @throws {Error} If the minimum or maximum values are not integers.
 * @return {number} The generated random number.
 */
export function getRandomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value.");
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("Minimum and maximum values must be integers.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Truncates a string by removing characters from the middle and replacing them with an ellipsis.
 *
 * @param {string} str - The string to be truncated.
 * @return {string} The truncated string.
 */
export function truncateString(str: string): string {

  if (str === null) {
    return "";
  }

  const startChars = 4;
  const endChars = 4;
  if (str.length <= startChars + endChars) {
    return str;
  }

  const start = str.substring(0, startChars);
  const end = str.substring(str.length - endChars);

  return `${start}…….${end}`;
}


/**
 * Generates a nonce string.
 *
 * @return {string} The generated nonce string.
 */
export const generateNonce = (): string => {
  const nonce = Math.floor(100000 + Math.random() * 900000);
  return nonce.toString();
};

/**
 * Converts a UTC date-time string to a formatted CET date-time string.
 *
 * @param {string} utcDateTime - The UTC date-time string to convert.
 * @return {string} The formatted date-time string in CET.
 */
export function convertToCET(utcDateTime: string): string {
  const date = new Date(utcDateTime);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "CET",
    hour12: false
  };
  // Format the date to CET
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  return formatter.format(date);
}