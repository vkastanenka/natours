class AppError extends Error {
  constructor(message, statusCode) {
    // Error.prototype.message
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Indicates an error as operational: Operational errors are error conditions that all correct programs must deal with, and as long as they're dealt with, they don't necessarily indicate a bug or even a serious problem
    this.isOperationalError = true;

    // err.stack (stack trace) will show us where the error happened
    // When a new object is created, and a constructor function is called, then that function call is not going to appear in the stack trace, and will not pollute it
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;