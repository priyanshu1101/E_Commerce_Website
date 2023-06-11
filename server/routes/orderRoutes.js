import express from "express";
import { authrizeRole, isAuthenticatedUser } from "../middleware/auth.js";
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";
const router = express.Router();

router.post('/new',isAuthenticatedUser,newOrder)
router.get('/getOrder/:id',isAuthenticatedUser,getSingleOrder);
router.get('/user/orders',isAuthenticatedUser,myOrders);
router.get('/admin/orders',isAuthenticatedUser,authrizeRole(['admin']),getAllOrders);
router.route('/admin/order/:id')
.put(isAuthenticatedUser,authrizeRole(['admin']),updateOrder)
.delete(isAuthenticatedUser,authrizeRole(['admin']),deleteOrder)


export default router;