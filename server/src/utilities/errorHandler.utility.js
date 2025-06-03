//=======================================================================================================================
// CUSTOM ERROR HANDLER CLASS
//=======================================================================================================================
// Extends the native Error class to include a status code.
// Captures the stack trace for better debugging.
//=======================================================================================================================

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this);
  }
}
 
export const errorHandler = ErrorHandler;