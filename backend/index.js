import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './Route/user.route.js';
import productRouter from './Route/product.routes.js';
import routerChat from './Route/chat.route.js';
import dbConnect from './config/db.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import initSocket from './socket/socket.js';


dotenv.config();

const port=process.env.PORT || 5000
const app=express();

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
const server = http.createServer(app);

initSocket(server);

app.get("/",(req,res)=>{
    res.send("API is running...");
})

app.use('/api/auth',userRoutes);
app.use('/api/products',productRouter);
app.use('/api/chat',routerChat);


server.listen(port,()=>{
    dbConnect();
    console.log(`Server is running on port ${port}`);
})




