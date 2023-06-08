import Product from "../models/productModel.js";
import ApiFeatures from "../utils/apifeatures.js";

// Create Product -- Only for admin
export const createProduct = async (req, res, next) => {
    try {
        req.body.createdBy = req.user._id;
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, product })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// Get All Products
export const getAllProducts = async (req, res) => {
    try { 
        const resultPerPage = 5;
        const productCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
        const Products = await apiFeature.query;
        res.status(200).json({ success: true, Products , productCount});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

//Get product details
export const getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });

    }
}

//Update the product -- Admin
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
        res.status(200).json({ success: true, updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

//Delete the product -- Admin
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Product Deleted Successfully!!!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}