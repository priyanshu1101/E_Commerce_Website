import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRouters.js";
import orderRoutes from "./routes/orderRoutes.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cloudinary from 'cloudinary';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cookieParser());
app.use(cors());

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/orders', orderRoutes);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => { console.log("Server is active on port : " + PORT) }))
    .catch((error) => { console.log(error) })

process.on("unhandledRejection", (err) => {
    console.log("Error : " + err.message);
})