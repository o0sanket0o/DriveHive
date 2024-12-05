import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "First name is required",
        minlength: [3, "First name should be atleast 3 characters long"]
    },
    lastName: {
        type: String, 
        minlength: [3, "Last name should be atleast 3 characters long"]
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        minlength: [5, "Email should be atleast 5 characters long"]
    },
    password: {
        type: String,
        required: "true",
    },
    socketId: {
        type: String,
        //For knowing the location of the driver.
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema);