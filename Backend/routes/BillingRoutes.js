const express=require('express');
const { AddToBilling } = require('../controller/BillingController');
const router=express.Router();

router.post('/getBilling', AddToBilling);

module.exports=router;