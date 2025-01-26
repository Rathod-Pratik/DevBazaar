const express=require('express');
const { UpdateProfile } = require('./../controller/ProfileController');

const router=express.Router();

router.post('/updateProfile',UpdateProfile)

module.exports=router;