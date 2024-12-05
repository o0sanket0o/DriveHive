import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
//What is dotenv doing?
import userRouter from './routes/user.router.js';
const app = express();
app.use(cors());

//WHat are these three doing?
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
//In case we want to use cookies in our application.

app.use('/api/user', userRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, function(err){
    //What do app.listen do? How does it work internally?
    connectDB();
    if(err) console.log("Error in the server setup.");
    else console.log("Server started successfully on port", PORT);
})