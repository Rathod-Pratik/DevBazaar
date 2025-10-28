import express from 'express';
const router=express.Router();
import {CreateContect, DeleteContact, GetContact} from '../controller/ContectController.js'
import { verifyAdmin } from '../middleware/User.middleware.js';

router.post('/createContact',CreateContect);
router.get('/getContact',verifyAdmin,GetContact);
router.delete('/deleteContact/:_id',verifyAdmin,DeleteContact)

export default router