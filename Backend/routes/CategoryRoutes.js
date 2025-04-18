import express from 'express'
import { CreateCategory, DeleteCategory, getCategory, updateCategory } from '../controller/CategoryController.js';

const routes=express.Router();

routes.get('/GetCategory',getCategory);
routes.post('/CreateCategory',CreateCategory);
routes.post('/EditCategory',updateCategory)
routes.delete('/deleteCategory/:_id',DeleteCategory)

export default routes;