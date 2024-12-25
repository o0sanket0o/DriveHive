import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import rideModel from "../models/ride.model.js";

export const rideController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {captainId, pickup, destination, vehicleType} = req.body;
    try{
        const ride = await createRide({captainId, pickup, destination, vehicleType});
        return res.status(201).json(ride);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

export const fetchRides = async (req, res) => {
    try{
        const rides = await rideModel.find();
        return res.status(200).json(rides);
    }
    catch(err){
        console.log("Error occured in fetchRides function in user.controller.js", err);
    }
}