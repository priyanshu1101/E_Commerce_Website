import mongoose from "mongoose";
import validator from "validator";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";
import Crypto from 'crypto';

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
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
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpire: {
        type: Date,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userType: {
        type: String,
        default: "website"
    }
})

// To HASH the password (if changed if not changed then save as it is) before the user is saved
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) // Here this keyword allow us to access the data passed.
    {
        next();
    }
    this.password = await bcyrpt.hash(this.password, 10);
})
//  JWT TOKEN
userSchema.methods.getJWTToken = function () {      //To create JWT for user login
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

// Compare Password
userSchema.methods.comparePasswords = function (password) {
    return bcyrpt.compare(password, this.password);
}

// Generating reset password token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = Crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = Crypto
        .createHash('sha256')
        .update(resetToken)
        .digest("hex")

    // Setting time for the token to expire (15 mins)
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model("User", userSchema);

export default User;