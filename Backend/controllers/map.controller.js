import express from 'express';
import { autoSuggestions, getAddressCoordinate, getDistanceTime } from '../services/maps.service.js';
import { validationResult } from 'express-validator';

export const getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    const address = req.query.address;
    try{
        const data = await getAddressCoordinate(address);
        res.status(200).json({data, success: true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({errorMessage: "Internal Server Error", success: false});
    }
}

export const getDistanceAndTime = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try{
        const origin = req.query.origin;
        const destination = req.query.destination;
        if(!origin || !destination){
            return res.status(400).json({errorMessage: "Origin and Destination are required", success: false});
        }
        const data = await getDistanceTime(origin, destination);
        res.status(200).json({data, success: true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({errorMessage: "Internal Server Error", success: false});
    }
}
export const getSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    try{
        const input = req.query.input;
        if(!input){
            return res.status(400).json({errorMessage: "Input is required", success: false});
        }
        const data = await autoSuggestions(input);
        res.status(200).json({data, success: true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({errorMessage: "Internal Server Error", success: false});
    }
}
