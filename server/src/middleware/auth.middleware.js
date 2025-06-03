import jwt from "jsonwebtoken";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import asyncHandler from "../utilities/asyncHandler.utility.js";
//=======================================================================================================================
// AUTH MIDDLEWARE - VERIFY JWT TOKEN
//=======================================================================================================================
// This middleware checks if the user is authenticated via a valid JWT token stored in cookies.
//=======================================================================================================================

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new errorHandler("Invalid token", 400));
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = tokenData;
    next();
});
