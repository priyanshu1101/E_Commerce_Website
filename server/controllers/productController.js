import Product from "../models/productModel.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from 'cloudinary';

// Create Product -- Only for admin
export const createProduct = async (req, res, next) => {
    try {
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        }
        else {
            images = req.body.images;
        }
        const imageLinks = [];
        for (var i = 0; i < images.length; i++) {
            const myCloud = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imageLinks.push({
                public_id: myCloud.public_id,
                url: myCloud.url
            });
        }
        req.body.images = imageLinks;
        req.body.createdBy = req.user._id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
// Get All Products
export const getAllProducts = async (req, res) => {
    try {
        const resultPerPage = 8;
        const apiFeature1 = new ApiFeatures(Product.find(), req.query).search().filter();
        const productCount = (await apiFeature1.query).length;
        const apiFeature2 = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
        const Products = await apiFeature2.query;
        res.status(200).json({
            success: true,
            Products,
            productCount,
            resultPerPage
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

// Get All Products -- Admin
export const getAllProductsForAdmin = async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json({
            success: true,
            Products,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

//Get product details
export const getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate({ path: "reviews.user", select: "avatar.url", });
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}


//Update the product -- Admin
export const updateProduct = async (req, res, next) => {
    function isCloudinaryUrl(url) {
        return /^https?:\/\/res\.cloudinary\.com\/[a-z0-9_-]+\/image\/upload\//i.test(url);
    }

    function extractPublicId(url) {
        const regex = /\/([^/]+)(\.[^.]+)?$/;
        const match = url.match(regex);

        if (match && match.length > 1) {
            return match[1];
        }

        return null;
    }
    try {
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        }
        else {
            images = req.body.images;
        }
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }

        // Delete the unwanted images
        for (let i = 0; i < product.images.length; i++) {
            var flag = 0;
            for (let j = 0; j < images.length; j++) {
                if (!isCloudinaryUrl(images[j]))
                    continue;
                if (product.images[i].url === images[j]) {
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
        }

        const imageLinks = [];



        for (var i = 0; i < images.length; i++) {
            if (isCloudinaryUrl(images[i])) {
                imageLinks.push({
                    public_id: extractPublicId(images[i]),
                    url: images[i]
                });
            }
            else {
                const myCloud = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });
                imageLinks.push({
                    public_id: myCloud.public_id,
                    url: myCloud.url
                });
            }
        }
        req.body.images = imageLinks;

        await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
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


        // Delete images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }


        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully!!!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
// Create new review or update the review
export const createProductReview = async (req, res) => {
    try {
        const {
            rating,
            comment,
            productId
        } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment: comment
        }
        const product = await Product.findById(productId);
        const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString()) {
                    rev.rating = rating;
                    rev.comment = comment;
                }
            })
        } else {
            product.reviews.push(review);
        }
        product.numOfReviews = product.reviews.length;
        let avg = 0;
        product.reviews.forEach(rev => avg += rev.rating);
        product.ratings = avg / product.reviews.length;
        await product.save({
            validateBeforeSave: false
        });
        res.status(200).json({
            success: true,
            message: "Product reviewed Successfully!!!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

// Get all reviews of a product
export const getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.query.productId);
        if (!product)
            throw new Error("Product not found!!");
        res.status(200).json({
            success: true,
            reviews: product.reviews
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

// Delete a review of a product
export const deleteReview = async (req, res) => {
    try {
        const product = await Product.findById(req.query.productId);
        if (!product)
            throw new Error("Product not found!!");
        product.reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
        product.numOfReviews = product.reviews.length;
        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating
        });
        product.ratings = (product.numOfReviews === 0) ? 0 : avg / product.reviews.length;
        product.save({
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            message: "Review removed Successfully!!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}