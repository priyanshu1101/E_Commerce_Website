import User from "../models/userModel.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "this is demo id",
                url: "www.demourl.com"
            }
        })
        const token = user.getJWTToken();
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(201).cookie("token", token, options).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }

}

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