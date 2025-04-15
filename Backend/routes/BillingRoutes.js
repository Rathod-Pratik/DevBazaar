import express from 'express'
import { AddToBilling } from '../controller/BillingController.js';
const router=express.Router();

router.post('/getBilling', AddToBilling);
export default router;