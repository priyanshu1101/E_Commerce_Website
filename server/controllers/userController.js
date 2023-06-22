import googleUser from "../models/googleUserModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import cloudinary from 'cloudinary';
import Crypto from 'crypto';
import axios from 'axios';

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        })
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });

        const token = user.getJWTToken();
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.status(201).cookie("token", token, options).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error("Email and Password can't be Empty");

        const user = await User.findOne({ email }).select("+password");
        if (!user)
            throw new Error("User not found!!");

        const isPasswordMatched = await user.comparePasswords(password);

        if (!isPasswordMatched)
            throw new Error("Invalid Email or Password");

        const token = user.getJWTToken();

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).cookie("token", token, options).json({ success: true, user, token });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}
export const googleAuth = async (req, res) => {
    try {
        const { googleId, imageUrl, email, name, accessToken } = req.body;
        
        // To verify google auth 
        await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
        
        if (!email)
            throw new Error("Invalid Autherization !!");
        var token;
        const user = await googleUser.findOne({ email });
        if (!user) {
            // Register new user
            const newUser = await googleUser.create({
                name,
                email,
                avatar: {
                    public_id: googleId,
                    url: imageUrl
                }
            });
            token = newUser.getJWTToken();
        }
        else {
            // Login (Also the image , name and google Id is updated)
            const updatedUser = await googleUser.findOneAndUpdate({ email }, { name, imageUrl, googleId });
            token = updatedUser.getJWTToken();
        }
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).cookie("token", token, options).json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

export const logoutUser = (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Already logged Out!!")
        }
        res.status(200).clearCookie("token").json({ success: true, message: "Logged Out Successfully!!" });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error("No Such User Found !!");
        }
        // Get ResetPassword Token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/users/password/reset/${resetToken}`
        const message = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f2f2f2;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333333; margin-bottom: 20px;">Password Reset</h2>
            <p style="color: #333333;">Dear Customer,</p>
            <p style="color: #333333;">We have received a request to reset your password. To proceed with the password reset, please click the link below:</p>
            <p style="margin-bottom: 30px;"><a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">Reset Password</a></p>
            <p style="color: #333333;" >Note: This link is valid for 15 minutes. If you did not request a password reset, please ignore this email.</p>
            <p style="color: #333333;">Thank you,</p>
            <p style="color: #333333;">EasyShop Pvt Limited</p>
          </div>
        </div>
      `;

        try {
            await sendEmail({
                email: user.email,
                subject: "Customer account password reset",
                message,
            })

            res.status(200).json({ success: true, message: `Reset Password Email is sent to ${user.email} Successfully!!` })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false })
            res.status(401).json({ success: false, message: error.message });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}


export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = Crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest("hex")

        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

        if (!user) {
            throw new Error("Reset password token is either invalid or has been expired");
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw new Error("Password does not match");
        }

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.password = req.body.password;
        await user.save({ validateBeforeSave: false });
        const token = user.getJWTToken();
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).cookie("token", token, options).json({ success: true, message: "Password is changed successfully!!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// User details for user profile
export const getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// Update the user password
export const updatePassword = async (req, res) => {
    try {
        const user = await User.findOne(req.user._id).select("+password");
        const isPasswordMatched = await user.comparePasswords(req.body.oldPassword);
        if (!isPasswordMatched)
            throw new Error("Old password doesn't match");
        if (req.body.newPassword !== req.body.confirmPassword)
            throw new Error("Password doesn't match");
        user.password = req.body.newPassword;
        await user.save({ validateBeforeSave: false });
        res.status(200).json({ success: true, message: "Password Updated Successfully!!" })
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Update the user profile
export const updateProfile = async (req, res) => {
    try {
        const updatedUser = {
            name: req.body.name,
            email: req.body.email
        }

        // We will add cloud for image later

        const user = await User.findByIdAndUpdate(req.user.id, updatedUser,
            {
                new: true.valueOf,
                runValidators: true,
            });

        res.status(200).json({ success: true, message: "Profile Updated Successfully!!" })
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


// Get all users -- Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users)
            throw new Error("No User Found!!");
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Get single user details -- Admin
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            throw new Error("No user found with User ID : " + req.params.id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Update the user profile -- Admin
export const updateUserRole = async (req, res) => {
    try {
        const updatedUser = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(req.user.id, updatedUser,
            {
                new: true.valueOf,
                runValidators: true,
            });

        res.status(200).json({ success: true, message: "Profile Updated Successfully!!" })
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Delete user -- Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            throw new Error("No User Found!!");
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "User Deleted Successfully!!" })
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

