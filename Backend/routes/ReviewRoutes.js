import { CreateReview, DeleteReview, GetAllReview, GetReview } from '../controller/ReviewController.js';
import express from 'express'
import { verifyAdmin } from '../middleware/User.middleware.js';
const route= express.Router();

route.get('/getreview/:Productid',GetReview);
route.post('/createreview',CreateReview);
route.delete('/deletereview/:_id',verifyAdmin,DeleteReview)
route.get('/getallreview',verifyAdmin,GetAllReview)
export default route
