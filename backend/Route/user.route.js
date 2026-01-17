import express from 'express';
import protect from '../middleware/auth.middleware.js';
import { userLogin, getMe, userSignup, getAllUsers, getSingleUsers, deleteSingleUsers, updateSingleUsers } from '../controllers/auth.controller.js';

const userRouter=express.Router();

userRouter.post('/login',userLogin);
userRouter.post('/signup',userSignup);  
userRouter.get('/me',protect,getMe);



userRouter.get('/:id',getSingleUsers);
userRouter.delete('/:id',deleteSingleUsers);
userRouter.put('/:id',updateSingleUsers);


export default userRouter;