import express from 'express';
const router = express.Router();
import {body} from 'express-validator';
import { fetchRides, rideController } from '../controllers/ride.controller.js';
import { isAuthCaptain, isAuthenticated } from '../middlewares/isAuthenticated.js';

router.post('/create', 
    isAuthCaptain,
    body('captainId').isString().isLength({min:24, max:24}).withMessage('Invalid Captain Id'),
    body('pickup').isString().isLength({min: 3}).withMessage("Invalid Pickup Location"),
    body('destination').isString().isLength({min: 3}).withMessage("Invalid Drop Location"),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage("Invalid Vehicle Type"),
    rideController
)
router.get('/fetch', isAuthenticated, 
    body('userId').isString().isLength({min:24, max:24}).withMessage('Invalid Captain Id'),
    body('pickup').isString().isLength({min: 3}).withMessage("Invalid Pickup Location"),
    body('destination').isString().isLength({min: 3}).withMessage("Invalid Drop Location"),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage("Invalid Vehicle Type"),
    fetchRides
)
export default router;