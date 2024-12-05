import { User } from "../models/user.model.js";
import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import blacklistTokenModel from "../models/blacklistToken.model.js";
dotenv.config();

export const register = async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message: "All fileds are are required."});
        }
        const findUser = await User.findOne({email: email});
        if(findUser){
            return res.status(400).json({message: "User already exists."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName: firstName, 
            lastName: lastName,
            email: email,
            password: hashedPassword
        })
        await user.save();
        return res.status(201).json({
            message: "User created successfully.",
            user: user,
            success: true,
        })
    }
    catch(err){
        console.log("Error occured in register function in user.controller.js", err);
    }
}
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required."});
        }
        let foundUser = await User.findOne({email: email});
        if(!foundUser){
            return res.status(400).json({message: "User does not exist."});
        }
        const hashed = await bcrypt.compare(password, foundUser.password);
        if(!hashed){
            return res.status(400).json({message: "Invalid credentials."});
        }
        const tokenData = {
            id: foundUser._id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "24h"});
        foundUser = {
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            id: foundUser._id,
        }
        res.cookie('token', token, {httpOnly: true});
        return res.status(200).json({
            message: "Logged in successfully",
            token: token,
            user: foundUser,
            success: true,
        })
    }
    catch(err){
        console.log("Error occured in login function in user.controller.js", err);
    }
}

export const getProfile = async (req, res) => {
    try{
        return res.status(200).json({
            user: req.user,
            success: true,
        })
    }
    catch(err){
        console.log("Error occured in getProfile function in user.controller.js", err);
    }
}

export const logout = async (req, res) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const blacklistToken = new blacklistTokenModel({
            token: token,
        })
        await blacklistToken.save();
        res.clearCookie('token');
        return res.status(200).json({
            message: "Logged out successfully.",
            success: true
        })
    }catch(err){
        console.log("Error occured in logout function in user.controller.js", err);
    }
}