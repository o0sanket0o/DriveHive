import mongoose from 'mongoose';
import { type } from 'os';

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    //Whichever captain will accept the ride will be assigned to the ride
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending'
    },
    fare:{
        type: Number,
        required: true
    },
    distance:{
        type: Number,
        required: true
    },//in minutes
    duration:{
        type: String,
    },//in seconds
    paymentId:{
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
        required: true
    },
})

export default mongoose.model('Ride', rideSchema);