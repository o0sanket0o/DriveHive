import express from 'express';
const router = express.Router();
import { getProfile, login, logout, register } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getProfile').get(isAuthenticated, getProfile);
router.route('/logout').get(logout);

export default router;
