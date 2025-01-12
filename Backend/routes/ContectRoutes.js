const express=require('express');
const Contect = require('../controller/ContectController');
const router=express.Router();
const nodemailer = require("nodemailer");

router.post('/contect',Contect);

module.exports=router;