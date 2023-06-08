import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouters.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/products',productRoutes);

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT, () => {console.log("Server is active on port : " + PORT)}))
.catch((error)=>{console.log(error)})

process.on("unhandledRejection",(err)=>{
    console.log("Error : "+err.message);
})