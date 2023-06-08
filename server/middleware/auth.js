import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Please login to access this resource");
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
export const authrizeRole = (roles) => {
    return (req, res, next) => {
        try {
            if(!roles.includes(req.user.role))
            {
                throw new Error (`Role: ${req.user.role} is not allowed to access this resource`);
            }
            next();
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}
