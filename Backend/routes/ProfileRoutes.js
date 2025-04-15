import express from 'express'
import { UpdateProfile } from './../controller/ProfileController.js';

const router=express.Router();

router.post('/updateProfile',UpdateProfile)

export default router;