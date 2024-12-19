import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const rideController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {userId, pickup, destination, vehicleType} = req.body;
    try{
        const ride = await createRide({userId, pickup, destination, vehicleType});
        return res.status(201).json(ride);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}