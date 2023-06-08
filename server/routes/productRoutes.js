import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from "../controllers/productController.js";
import { authrizeRole, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.get('/',getAllProducts);
router.post('/new',isAuthenticatedUser,authrizeRole(['admin']),createProduct);
router.route('/:id').get(getProductDetails).put(isAuthenticatedUser,authrizeRole(['admin']),updateProduct).delete(isAuthenticatedUser,authrizeRole(['admin']),deleteProduct);

export default router;