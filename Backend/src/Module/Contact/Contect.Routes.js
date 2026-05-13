import express from 'express';
const router=express.Router();
import {CreateContect, DeleteContact, GetContact} from './Contect.Controller.js'
import { verifyAdmin, verifyUser } from '../../Middleware/Auth.middleware.js';

router.post('/createContact',verifyUser,CreateContect);
router.get('/getContact',verifyAdmin,GetContact);
router.delete('/deleteContact/:_id',verifyAdmin,DeleteContact)

export default router