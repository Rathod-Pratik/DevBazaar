import { CreateReview, DeleteReview, GetAllReview, GetReview, GetReviewsByProducts } from './Review.Controller.js';
import express from 'express'
import { verifyAdmin, verifyUser } from '../../Middleware/Auth.middleware.js';
import upload from '../../Middleware/Multer.Middleware.js';
const route = express.Router();

route.get('/getreview/:ProductId', GetReview);
route.get('/getreview-by-products', GetReviewsByProducts);
route.post('/createreview', verifyUser, upload.array('images', 10), CreateReview);
route.delete('/deletereview/:_id', verifyAdmin, DeleteReview)
route.get('/getallreview', verifyAdmin, GetAllReview)
export default route
