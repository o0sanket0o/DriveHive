import Ride from '../models/ride.model.js';
import { getDistanceTime } from './maps.service.js';
import crypto from 'crypto';


const generateOtp = (num) => {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    //I am not using Math.floor since it is very predictable. So for security purpose I am using crypto. 
export const bookRide = async (req, res) => {
    try{
        const {userId, rideId} = req.body;
        const ride = await Ride.findById(rideId);
        if(!ride){
            return res.status(404).json({message: "Ride not found"});
        }
        if(ride.user){
            return res.status(400).json({message: "Ride already booked"});
        }
        ride.user = userId;
        ride.status = 'accepted';
        await ride.save();
        res.json({message: "Ride booked successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Couldn't book the ride"});
    }
}

export const createRide = async ({captainId, pickup, destination, vehicleType}) => {
    // console.log(captainId, pickup, destination, vehicleType);
    if(!captainId || !pickup || !destination || !vehicleType){
        throw new Error('CaptainId, Pickup, Destination and VehicleType are required');
    }
    const {distance, duration} = await getDistanceTime(pickup, destination);
    const fare = getFare(parseInt(distance), vehicleType);
    const ride = new Ride({
        captain: captainId,
        pickup,
        destination,
        distance : parseInt(distance),
        duration,
        fare,
        otp: generateOtp(6)
    })
    await ride.save();
    return ride;
}

const getFare = (distance, vehicleType) => {
    if(vehicleType == 'auto') return (10 * distance);
    else if(vehicleType == 'car') return (15 * distance);
    return (8 * distance);
}

export const endRide = async(req, res) => {
    try{
        const {captainId, rideId} = req.body;
        const ride = await Ride.findById(rideId);
        if(!ride){
            return res.status(404).json({message: "Ride not found"});
        }
        if(ride.captain != captainId){
            return res.status(401).json({message: "Unauthorized"});
        }
        ride.status = 'completed';
        await ride.save();
        res.json({message: "Ride ended successfully."});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Couldn't end the ride"});
    }
}