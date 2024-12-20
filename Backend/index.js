import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cookieParser from 'cookie-parser';
import mapRoutes from './routes/maps.routes.js'
dotenv.config();
//What is dotenv doing?
import userRouter from './routes/user.router.js';
import rideRouter from './routes/ride.routes.js';
import captainRouter from './routes/captain.router.js';
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173", "https://drive-hive.vercel.app"],
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
}
app.use(cors(corsOptions));

//WHat are these three doing?
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
//In case we want to use cookies in our application.

app.use('/api/user', userRouter);
app.use('/api/captain', captainRouter);
app.use('/maps', mapRoutes);
app.use('/rides', rideRouter);


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