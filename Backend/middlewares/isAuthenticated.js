import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const isAuthenticated = async (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers?.authorization?.split(" ")[1]; 
        //To access the cookies in request. We need cookie parser that we have used as middleware in the index.js.
        // console.log("Entered with token", token);
        //In industry level, if we send token in headers, then in the header. We will send authorisation key with a value. Value is "bearer ${token}". So, we split the value and get the token.
        if(!token) return res.status(401).json({message: "Unauthorized"});
        const isBlacklisted = await blacklistTokenModel.findOne({token: token});
        if(isBlacklisted) return res.status(401).json({message:"Unauthorized"});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message: "Unauthorized"});
        // console.log("Decoded is ", decoded);
        const userinDb = await User.findById(decoded.id);
        // console.log("User in db is ", userinDb);
        req.user = userinDb;
        next();
    }
    catch(err){
        console.log("Error occured in isAuthenticated function in isAuthenticated.js", err);
    }
}