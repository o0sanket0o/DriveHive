import Ride from '../models/ride.model.js';
import { getDistanceTime } from './maps.service.js';
import crypto from 'crypto';


const generateOtp = (num) => {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    //I am not using Math.floor since it is very predictable. So for security purpose I am using crypto. 

export const createRide = async ({userId, pickup, destination, vehicleType}) => {
    // console.log(userId, pickup, destination, vehicleType);
    if(!userId || !pickup || !destination || !vehicleType){
        throw new Error('UserId, Pickup, Destination and VehicleType are required');
    }

    const {distance, duration} = await getDistanceTime(pickup, destination);
    const fare = getFare(parseInt(distance), vehicleType);
    const ride = new Ride({
        user: userId,
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
