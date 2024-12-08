import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name should be atleast 3 characters long"]
    },
    lastName: {
        type: String, 
        minlength: [3, "Last name should be atleast 3 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email should be atleast 5 characters long"]
    },
    password: {
        type: String,
        required: "true",
    },
    socketId: {
        type: String,
        //For sharing the location of the driver.
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, "Color should be atleast 3 characters long"]
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, "Plate should be atleast 3 characters long"]
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, "Capacity should be atleast 1"]
        },
        vehicleType:{
            type: String,
            enum: ["car", "auto", "motorcycle"],
            required: true,
        }
    },
    location: {
        lat:{
            type: Number,
            //Required is not true since there's no location when the captain is inactive.
        },
        lng:{
            type: Number,
        }
    }
})

export const Captain = mongoose.model("Captain", captainSchema);