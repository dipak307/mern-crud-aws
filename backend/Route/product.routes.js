import express from 'express';
import  protectAuth  from '../middleware/auth.middleware.js';
import ownerAuth from '../middleware/role.middleware.js';
import upload from '../middleware/upload.middleware.js';
import { createProduct, getOwnerProducts, getProducts } from '../controllers/product.controller.js';

const productRouter = express.Router();



productRouter.post('/create', protectAuth ,ownerAuth, upload.single('image'),createProduct);
productRouter.get('/', protectAuth , getProducts);
productRouter.get('/owner/:ownerId', protectAuth , ownerAuth, getOwnerProducts);


export default productRouter;