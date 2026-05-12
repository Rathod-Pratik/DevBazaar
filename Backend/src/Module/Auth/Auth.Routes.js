import { signup, Login, GetUser, BlockUser, DeleteUser, UnblockUser, Logout, ForgotPassword, VerifyOTP, ResetPassword } from './Auth.Controller.js'
import express from 'express'
import { verifyAdmin } from '@middleware/Auth.middleware.js';
const router=express.Router();

router.post('/auth/signup',signup);
router.post('/auth/login',Login);
router.get('/logout',Logout)
router.get('/getUser' ,verifyAdmin,GetUser);
router.post('/blockUser/:_id' ,verifyAdmin,BlockUser);
router.post('/UnblockUser/:_id' ,verifyAdmin,UnblockUser);
router.delete('/deleteUser/:_id' ,verifyAdmin,DeleteUser)
router.post('/auth/forgot-password', ForgotPassword);
router.post('/auth/verify-otp', VerifyOTP);
router.post('/auth/reset-password', ResetPassword);

export default router;