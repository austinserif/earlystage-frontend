/** Custom error class containing `message` and `statusCode` attributes */
export default class EarlystageError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
