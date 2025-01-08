const express=require('express');
const { AddToBilling } = require('../controller/BillingController');
const router=express.Router();

router.get('/getBilling', AddToBilling);

module.exports=router;