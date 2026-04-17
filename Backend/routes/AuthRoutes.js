import { signup, Login, GetUser, BlockUser, DeleteUser, UnblockUser, Logout, ForgotPassword, VerifyOTP, ResetPassword } from '../controller/AuthController.js'
import { body } from 'express-validator';
import express from 'express'
import { verifyAdmin } from '../middleware/User.middleware.js';
const router=express.Router();

router.post('/auth/signup',[
    body('email', 'enter valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
],signup);
router.post('/auth/login',[
    body('email', 'enter valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
],Login);
router.get('/logout',Logout)
router.get('/getUser' ,verifyAdmin,GetUser);
router.post('/blockUser/:_id' ,verifyAdmin,BlockUser);
router.post('/UnblockUser/:_id' ,verifyAdmin,UnblockUser);
router.delete('/deleteUser/:_id' ,verifyAdmin,DeleteUser)
router.post('/auth/forgot-password', ForgotPassword);
router.post('/auth/verify-otp', VerifyOTP);
router.post('/auth/reset-password', ResetPassword);

export default router;