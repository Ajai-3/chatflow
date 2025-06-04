import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";
import asyncHandler from '../utilities/asyncHandler.utility.js';
import { errorHandler } from '../utilities/errorHandler.utility.js';
import { response } from 'express';

//=======================================================================================================================
// USER REGISTRATION
//=======================================================================================================================
// This controller is help to create account for new users
//=======================================================================================================================
export const registerUser = asyncHandler(async (req, res, next) => {
    const { fullname, username, gender, password } = req.body;
    console.log(req.body);

    if (!fullname || !username || !password) {
        return next(new errorHandler("All fields are required", 400));
    }

    const existUsername = await userModel.findOne({ username });
    if (existUsername) {
        return next(new errorHandler("User name already exists", 400));
    }

    const avatarType = gender === "male" ? "boy" : "girl"
    const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`

    const user = new userModel({
        fullname, username, gender,
        avatar, password
    });
    await user.save();

   return res
    .status(201)
    .json({
        success: true,
        message: "User registered successfully",
        responseData: user
    });
});
//=======================================================================================================================
// USER LOGIN
//=======================================================================================================================
// This controller is help to login the user if alredy exist
//=======================================================================================================================
export const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new errorHandler("All fields are required", 400));
    }

    const user = await userModel.findOne({ username });
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new errorHandler("Invalid credentials", 401));
    }

    const tokenData = {
        _id: user?._id
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "2d"
    })

   return res
    .status(200)
    .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict", 
        maxAge: 2 * 24 * 60 * 60 * 1000 
    }).json({
        success: true,
        message: "Login successful",
        responseData: user
    });
});

//=======================================================================================================================
// GET ALL USER NAMES
//=======================================================================================================================
// This controller is help to get all user names, it is used in frondend to check the name is already exist or not is 
// not exist then only that request recive in backend
//=======================================================================================================================
export const getAllUsernames = asyncHandler(async (req, res, next) => {
    const users = await userModel.find({}, { username: 1, _id: 0 })
    if (!users) {
        return next(new errorHandler("Faild to fetch user names.", 404))
    }
    let usernames = users.map((user) => user.username)
    return res.status(200).json({ success: true, message: "All user name fetched sucessfully.", responseData: usernames })
})

//=======================================================================================================================
// USER PROFILE
//=======================================================================================================================
// This controller is help to get the logined user profile
//=======================================================================================================================
export const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;

    if (!userId) {
        return next(new errorHandler("Unauthorized access", 401));
    }

    const profile = await userModel.findById(userId).select("-password");

    if (!profile) {
        return next(new errorHandler("User not found", 404));
    }

    return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        responceData: {
            profile
        }
    });
});

//=======================================================================================================================
// GET OTHER USERS
//=======================================================================================================================
// This controller is help to get other users
//=======================================================================================================================
export const getOtherUsers = asyncHandler(async (req, res, next) => {

    const userId = req.user._id;

    if (!userId) {
        return next(new errorHandler("User id is not given", 400))
    }

    const otherUsers = await userModel.find({ _id: {$ne: userId} })

    if (!otherUsers) {
        return next(new errorHandler("User nto find", 404))
    }

    return res.status(200).json({
        success: true,
        message: "All user fetched",
        responseData: otherUsers
    })
})


//=======================================================================================================================
// USER LOGOUT
//=======================================================================================================================
// This controller is help the user to logout if  user is logined
//=======================================================================================================================
export const logout = asyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        .json({
            success: true,
            message: "User logged out successfully"
        });
});
