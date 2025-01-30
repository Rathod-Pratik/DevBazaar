const express=require('express');
const Contect = require('../controller/ContectController');
const router=express.Router();

router.post('/',Contect);

module.exports=router;