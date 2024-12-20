import express from 'express';
import { Captain } from '../models/captain.model.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { rmSync } from 'fs';
dotenv.config();

export const registerCaptain = async(req, res) => {
    const results = validationResult(req);
    // console.log("Entered register captain with ", req.body);
    if(!results.isEmpty()){
        return res.status(400).json({errors: results.array()});
    }
    const {firstName, lastName, email, password, vehicle} = req.body;
    // console.log(firstName, lastName, email, password, vehicle);
    try{
        const isCaptain = await Captain.findOne({email});
        if(isCaptain){
            return res.status(400).json({message: "Captain already exists."});
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const newCaptain = new Captain({
            firstName: firstName, 
            lastName: lastName,
            email: email,
            password: hashedPass,
            vehicle:{
                plate: vehicle.plate,
                color: vehicle.color,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType,
            }
        })
        // console.log("New captain is", newCaptain);
        await newCaptain.save();

        // console.log("Mail is ", newCaptain.email);
        const token = jwt.sign({email: newCaptain.email}, process.env.JWT_SECRET, {expiresIn: "24h"});
        return res.status(201).json({
            message:"Captain registered successfully",
            token: token,
            captain: {
                firstName: newCaptain.firstName,
                lastName: newCaptain.lastName,
                email: newCaptain.email,
                vehicle: newCaptain.vehicle
            },
            success: true,
        })
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}
export const loginCaptain = async (req, res) => {
    const results = validationResult(req);
    if(!results.isEmpty()){
        return res.status(400).json({errors: results.array()});
    }
    const {email, password} = req.body;
    try{
        const captain = await Captain.findOne({email});
        if(!captain){
            return res.status(400).json({message: "Captain does not exist."});
        }
        const isMatch = await bcrypt.compare(password, captain.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials."});
        }
        const tokenData = {
            id: captain._id,
            email: captain.email,
            firstName: captain.firstName,
            lastName: captain.lastName,
            vehicle: captain.vehicle,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "24h"});
        res.cookie('token', token, {httpOnly: true});
        //It means that the cookie is only accessible by the http requests like get/post/put/delete.
        //And can't be accessed by the javascript code like document.getCookie.
        return res.status(200).json({
            message: "Logged in successfully",
            token: token,
            captain: {
                firstName: captain.firstName,
                lastName: captain.lastName,
                email: captain.email,
                vehicle: captain.vehicle,
                role: 'captain'
            }
        })
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}
export const logoutCaptain = async (req, res) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const newBlacklistToken = new blacklistTokenModel({
            token: token,
        })
        await newBlacklistToken.save();
        res.clearCookie('token');
        return res.status(200).json({
            message: "Logged out successfully.",
        })
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

export const getProfileCaptain = async (req, res) => {
    try{
        return res.status(200).json({
            captain: req.captain,
        })
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}