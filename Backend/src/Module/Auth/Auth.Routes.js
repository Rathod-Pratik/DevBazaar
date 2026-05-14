import { signup, Login, Logout } from './Auth.Controller.js'
import express from 'express'
import { authRateLimiter } from '../../Middleware/RateLimit.middleware.js';
const router=express.Router();

router.post('/auth/signup', authRateLimiter, signup);
router.post('/auth/login', authRateLimiter, Login);
router.get('/logout',Logout)

export default router;