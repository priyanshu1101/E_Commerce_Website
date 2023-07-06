import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";

const router = express.Router();

router.post('/process', isAuthenticatedUser, processPayment)
router.get('/getStripeApiKey', isAuthenticatedUser, sendStripeApiKey);

export default router;