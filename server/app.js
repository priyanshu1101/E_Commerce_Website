import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRouters.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use('/users',userRoutes);
app.use('/product',productRoutes);
app.use('/orders',orderRoutes)

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT, () => {console.log("Server is active on port : " + PORT)}))
.catch((error)=>{console.log(error)})

process.on("unhandledRejection",(err)=>{
    console.log("Error : "+err.message);
})