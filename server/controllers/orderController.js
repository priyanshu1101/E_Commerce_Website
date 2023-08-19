import googleUser from "../models/googleUserModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// Create new order 
export const newOrder = async (req, res) => {
    try {
        const orderDetails = req.body;
        const order = await Order.create({
            ...orderDetails,
            paidAt: Date.now(),
            user: req.user._id
        })
        res.status(200).json({ success: true, message: "Thanks for ordering with us !!" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
}
// get single order
export const getSingleOrder = async (req, res) => {
    //  Need to find out method to populate using googleUser collection
    try {
        const order = await Order.findById(req.params.id);
        const user = await User.findById(order.user._id) || await googleUser.findById(order.user._id);
        if (!order) {
            throw new Error("Invalid order ID !!");
        }
        res.status(200).json({ success: true, order: { ...order._doc, user: user } })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


// get orders for logged in user
export const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Get all orders -- Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        let totalAmount = 0;
        orders.forEach(order => totalAmount += order.totalPrice)
        res.status(200).json({ success: true, orders, totalAmount });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Update order status -- admin 
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order.orderStatus === "Delivered")
            throw new Error("Order already delivered!!");


        // order.orderStatus = req.body.status;
        if (req.body.status === "Delivered")
            order.deliveredAt = Date.now();

        if (req.body.status === "Shipped") {
            for (const item of order.orderItems) {  // Stock availability check
                const product = await Product.findById(item.product);
                if (product.Stock - item.quantity < 0)
                    throw new Error(`${item.name} in the order are currently out of stock , only ${product.Stock} left :(`);
            }

            for (const item of order.orderItems) {  // Stock update
                const product = await Product.findById(item.product);
                product.Stock -= item.quantity;
                await product.save({ validateBeforeSave: false });
            }
        }

        order.orderStatus = req.body.status;


        await order.save({ validateBeforeSave: false });

        res.status(200).json({ success: true, message: "Order successfully updated !!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


// Delete Order -- admin 
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order)
            throw new Error("Invalid Order ID !!")
        await order.deleteOne();
        res.status(200).json({ success: true, message: "Order Deleted Successfully !!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}