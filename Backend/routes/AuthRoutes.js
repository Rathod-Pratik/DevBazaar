import { signup, Login, GetUser, BlockUser, DeleteUser } from '../controller/AuthController.js'
import { body } from 'express-validator';
import express from 'express'
const router=express.Router();

router.post('/auth/signup',[
    body('email', 'enter valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
],signup);
router.post('/auth/login',[
    body('email', 'enter valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
],Login);
router.get('/getUser',GetUser);
router.post('/blockUser',BlockUser);
router.delete('deleteUser/:_id',DeleteUser)

export default router;