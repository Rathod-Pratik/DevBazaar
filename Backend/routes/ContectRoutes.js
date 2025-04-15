import express from 'express';
const router=express.Router();
import {CreateContect, DeleteContact, GetContact} from '../controller/ContectController.js'

router.post('/createContact',CreateContect);
router.get('/getContact',GetContact);
router.delete('/deleteContact',DeleteContact)

export default router