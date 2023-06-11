import express from "express";
import { createProduct, createProductReview, deleteProduct, deleteReview, getAllProducts, getProductDetails, getProductReviews, updateProduct } from "../controllers/productController.js";
import { authrizeRole, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.get('/', getAllProducts);

router.post('/admin/new', isAuthenticatedUser, authrizeRole(['admin']), createProduct);

router.route('/admin/:id')
    .put(isAuthenticatedUser, authrizeRole(['admin']), updateProduct)
    .delete(isAuthenticatedUser, authrizeRole(['admin']), deleteProduct);

router.route('/admin/:id')
    .get(getProductDetails)

router.put('/review', isAuthenticatedUser, createProductReview);

router.route('/reviews')
    .get(getProductReviews)
    .delete(deleteReview);


export default router;