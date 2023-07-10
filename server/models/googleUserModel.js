import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const googleUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should be more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userType: {
        type: String,
        default: "google"
    }
})

//  JWT TOKEN
googleUserSchema.methods.getJWTToken = function () {      //To create JWT for user login
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

const googleUser = mongoose.model("GoogleUser", googleUserSchema);

export default googleUser;