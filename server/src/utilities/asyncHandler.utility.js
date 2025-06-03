//=======================================================================================================================
// ASYNC ERROR HANDLER WRAPPER
//=======================================================================================================================
// Utility to wrap async route handlers and automatically catch errors.
// This eliminates the need to write try-catch blocks in every controller,
// forwarding errors to Express's centralized error handling middleware.
//=======================================================================================================================
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
