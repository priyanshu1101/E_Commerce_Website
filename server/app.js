import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRouters.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoute from "./routes/paymentRoute.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cloudinary from 'cloudinary';
import cors from 'cors';
dotenv.config();
import path from 'path';

const app = express();

app.use(bodyParser.json({ limit: '200mb' })); // Parse JSON bodies
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(fileUpload());

app.use(cookieParser());
app.use(cors({
    origin: ((process.env.NODE_ENV === "DEVELOPMENT") ? 'http://localhost:3000' : process.env.ORIGIN),
    credentials: true
}));

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/payment', paymentRoute);

app.use(express.static(path.join('../client/build')))

app.get('*', (req, res) => {
    console.log(path.resolve("../client/build/index.html"));
    res.sendFile(path.resolve("../client/build/index.html"));
})

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
