import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//This file is to connect to the db.

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error occured while connecting the database", err);
    }
}
export default connectDB;