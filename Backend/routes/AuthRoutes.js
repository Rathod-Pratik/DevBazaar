const express =require('express');
const { signup, Login } = require('../controller/AuthController');
const { body } = require('express-validator');
const router=express.Router();

router.post('/signup',[
    body('email', 'enter valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
],signup);
router.get('/login',[
    body('email', 'enter valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
],Login);


module.exports=router;