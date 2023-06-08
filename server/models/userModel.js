import mongoose from "mongoose";
import validator from "validator";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema =new mongoose.Schema({
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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre("save", async function (next) {        // To HASH the password
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
userSchema.methods.comparePasswords = function(password){
    return bcyrpt.compare(password,this.password);
}


const User = mongoose.model("User", userSchema);

export default User;