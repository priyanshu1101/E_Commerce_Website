import googleUser from "../models/googleUserModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import cloudinary from 'cloudinary';
import Crypto from 'crypto';
import axios from 'axios';
import Product from "../models/productModel.js";


export const getGoogleClientId = async (req, res) => {
    res.status(200).json({ googleClientId: process.env.GOOGLE_CLIENT_ID });
}

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            crop: "scale",
            quality: "auto"
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
            httpOnly: true,
        };
        res.status(201).cookie("token", token, options).json({ success: true, token, expiresIn: process.env.COOKIE_EXPIRE });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error("Email and Password can't be Empty");

        const validateUser = await User.findOne({ email }).select("+password");
        if (!validateUser)
            throw new Error("User not found!!");

        const isPasswordMatched = await validateUser.comparePasswords(password);

        if (!isPasswordMatched)
            throw new Error("Invalid Email or Password");

        const user = await User.findOne({ email });
        const token = user.getJWTToken();

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(200).cookie("token", token, options).json({ success: true, user, token, expiresIn: process.env.COOKIE_EXPIRE });
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
        var user;
        const availableUser = await googleUser.findOne({ email });
        if (!availableUser) {
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
            user = newUser;
        }
        else {
            // Login (Also the image , name and google Id is updated)
            const updatedUser = await googleUser.findOneAndUpdate({ email }, { name, imageUrl, googleId });
            token = updatedUser.getJWTToken();
            user = updatedUser;
        }
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(200).cookie("token", token, options).json({ success: true, user, token, expiresIn: process.env.COOKIE_EXPIRE });
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
        const user = await User.findOne({ email: req.body.email }).select("+resetPasswordToken +resetPasswordExpire");
        if (!user) {
            throw new Error("No Such User Found !!");
        }
        // Get ResetPassword Token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/user/password/reset/${resetToken}`

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

        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } }).select("+resetPasswordToken +resetPasswordExpire");

        if (!user) {
            throw new Error("Reset password token is either invalid or has been expired");
        }
        if (!req.body.newPassword || !req.body.confirmPassword) {
            throw new Error("Password can't be empty");
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            throw new Error("Password does not match");
        }

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.password = req.body.newPassword;
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
        const user = await User.findById(req.user._id) || await googleUser.findById(req.user._id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// Update the user password
export const updatePassword = async (req, res) => {
    try {
        if (!req.body.newPassword)
            throw new Error("Password can't be empty !!");
        const user = await User.findOne(req.user._id).select("+password");
        const isPasswordMatched = await user.comparePasswords(req.body.oldPassword);
        if (!isPasswordMatched)
            throw new Error("Old password doesn't match !!");
        if (req.body.newPassword !== req.body.confirmPassword)
            throw new Error("Password doesn't match !!");
        user.password = req.body.newPassword;
        await user.save({ validateBeforeSave: false });
        res.status(200).json({ success: true, message: "Password Updated Successfully !!" })
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Update the user profile
export const updateProfile = async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email });
        var newAvatar = req.body.avatar;
        if (req.avatar === checkUser.avatar.url)
            newAvatar = req.body.avatar
        else {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                crop: "scale",
                quality: 'auto'
            })
            newAvatar = {
                public_id: myCloud.public_id,
                url: myCloud.url
            }
        }
        const updatedUser = {
            name: req.body.name,
            email: req.body.email,
            avatar: newAvatar
        }
        const user = await User.findByIdAndUpdate(req.user.id, updatedUser,
            {
                new: true.valueOf,
                runValidators: true,
            });

        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


// Get all users -- Admin
export const getAllUsers = async (req, res) => {
    try {
        const websiteUsers = await User.find();
        const googleUsers = await googleUser.find();
        const users = [...websiteUsers, ...googleUsers];
        if (users.length === 0) {
            throw new Error("No User Found!!");
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Get single user details -- Admin
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id) || await googleUser.findById(req.params.id);
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
            role: req.body.role
        }

        const websiteUser = await User.findById(req.params.id);

        if (!websiteUser) {
            const user = await googleUser.findByIdAndUpdate(req.params.id, updatedUser,
                {
                    new: true.valueOf,
                    runValidators: true,
                });
        }
        else {
            const user = await User.findByIdAndUpdate(req.params.id, updatedUser,
                {
                    new: true.valueOf,
                    runValidators: true,
                });
        }
        res.status(200).json({ success: true, message: "Profile Updated Successfully!!" })
    }
    catch (error) {
        log
        res.status(400).json({ success: false, message: error.message });
    }
}

// Delete user -- Admin
export const deleteUser = async (req, res) => {
    try {
        const websiteUser = await User.findById(req.params.id);
        const googleUsers = await googleUser.findById(req.params.id);
        if (!websiteUser && !googleUsers)
            throw new Error("No User Found!!");
        if (req.params.id === req.user.id)
            throw new Error("Can't delete yourself !!");

        // Delete images from cloudinary
        if (websiteUser)
            await cloudinary.v2.uploader.destroy(websiteUser.avatar.public_id);

        // Delete user reviews
        const products = await Product.find();
        for (const product of products) {
            product.reviews = product.reviews.filter(review => review.user !== null && review.user.toString() !== req.params.id);
            product.numOfReviews = product.reviews.length;
            const ratings = product.reviews.reduce((total, review) => total + review.rating, 0);
            product.ratings = product.numOfReviews === 0 ? 0 : (ratings / product.numOfReviews);
            await product.save({ validateBeforeSave: false });
        }

        if (websiteUser)
            await User.findByIdAndDelete(req.params.id);
        else if (googleUsers)
            await googleUser.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "User Deleted Successfully!!" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


