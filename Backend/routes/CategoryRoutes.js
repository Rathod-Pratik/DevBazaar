import express from 'express'
import { CreateCategory, DeleteCategory, getCategory, updateCategory } from '../controller/CategoryController.js';

const routes=express.Router();

routes.get('/GetCategory',getCategory);
routes.post('/CreateCategory',CreateCategory);
routes.put('/EditCategory',updateCategory)
routes.delete('/EditCategory/:_id',DeleteCategory)

export default routes;