import express from 'express'
import { CreateCategory, DeleteCategory, getCategory, updateCategory } from '../controller/CategoryController.js';
import { verifyAdmin } from '../middleware/User.middleware.js';

const routes=express.Router();

routes.get('/GetCategory',getCategory);
routes.post('/CreateCategory',verifyAdmin,CreateCategory);
routes.post('/EditCategory',verifyAdmin,updateCategory)
routes.delete('/deleteCategory/:_id',verifyAdmin,DeleteCategory)

export default routes;