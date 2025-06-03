//=======================================================================================================================
// GLOBAL ERROR HANDLING MIDDLEWARE
//=======================================================================================================================
// Catches all errors forwarded via next() and sends standardized JSON response.
// Defaults status code to 500 and message to "Internal server error" if missing.
//=======================================================================================================================
export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    res.status(err.statusCode).json({
        success: false,
        errMessage: err.message,
    });
};
