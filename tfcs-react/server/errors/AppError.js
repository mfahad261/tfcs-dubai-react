/** An expected failure whose message is safe to show to the visitor. */
export class AppError extends Error {
  constructor(statusCode, message, fieldErrors) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
  }
}
