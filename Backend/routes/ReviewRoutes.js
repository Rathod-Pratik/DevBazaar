import { CreateReview, DeleteReview, GetAllReview, GetReview } from '../controller/ReviewController.js';
import express from 'express'
const route= express.Router();

route.get('/getreview/:Productid',GetReview);
route.post('/createreview',CreateReview);
route.delete('/deletereview/:_id',DeleteReview)
route.get('/getallreview',GetAllReview)
export default route
