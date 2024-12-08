import express from 'express';
const router = express.Router();
import { validationResult } from 'express-validator';
import { logoutCaptain, registerCaptain } from '../controllers/captian.controller.js';
import { loginCaptain } from '../controllers/captian.controller.js';
import { getProfileCaptain } from '../controllers/captian.controller.js';
import { check } from 'express-validator';
import { body } from 'express-validator';
import { isAuthCaptain } from '../middlewares/isAuthenticated.js';
//Express validator is a set of express.js middlewares that wraps validator.js validator and sanitizer fucntions offered by validator.js.
//We will validate user and vehicle data as well.

router.post('/register', [
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('password').isLength({min: 6}).withMessage("Password should be of atleast 6 characters."),
    body('firstName').isLength({min: 3}).withMessage("First name should be atleast 4 characters."),
    body('vehicle.color').isLength({min: 3}).withMessage("Color should be atleast 3 characters."),
    body('vehicle.plate').isLength({min: 3}).withMessage("Plate should be atleast 3 characters."),
    body('vehicle.capacity').isInt({min: 1}).withMessage("Capacity should be atleast one."),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage("Invalid vehicle type.")
],
registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('password').isLength({min: 6}).withMessage("Password should be of atleast 6 characters."),
], 
loginCaptain
)
router.get('/getProfile', isAuthCaptain, getProfileCaptain);
router.get('/logout', isAuthCaptain, logoutCaptain);

export default router;