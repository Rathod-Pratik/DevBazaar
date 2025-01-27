const express=require('express');
const Contect = require('../controller/ContectController');
const router=express.Router();
const nodemailer = require("nodemailer");

router.post('/',Contect);

module.exports=router;