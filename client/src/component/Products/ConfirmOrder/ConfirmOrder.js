import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import MetaData from '../../../MetaData';
import ItemCard from './ItemCard/ItemCard';
import { useNavigate } from 'react-router-dom';
import './ConfirmOrder.css';

const ConfirmOrder = () => {
    const Navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const calculateSubtotal = () => {
        let subtotal = 0;
        cartItems.forEach((item) => {
            subtotal += item.price * item.quantity;
        });
        return subtotal;
    };

    const taxRate = 0.18; // 18% tax rate
    const shippingCharges = calculateSubtotal() > 1000 ? 0 : 200;
    const totalPrice = (calculateSubtotal() + shippingCharges + calculateSubtotal() * taxRate);

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`;
    const handleProceedToPayment = () => {
        const data = {
            subtotal: calculateSubtotal(),
            shippingCharges,
            tax: calculateSubtotal() * taxRate,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        Navigate('/order/payment');
    }

    return (
        <div className="confirmOrderPage">
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <Grid container spacing={3} className="mainContainer">
                <Grid item xs={12} md={6}>
                    <div className="cartItemsContainer">
                        <Typography variant="h6" gutterBottom>
                            Your Cart Items:
                        </Typography>
                        <div className="cartItemsScrollable">
                            {cartItems.map((item) => (
                                <ItemCard key={item.product} item={item} />
                            ))}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className="shippingInfoContainer">
                        <Typography variant="h6" gutterBottom>
                            Shipping Info
                        </Typography>
                        <Box className="shippingInfoBox">
                            <div>
                                <Typography variant="subtitle1">Name:</Typography>
                                <Typography>{user.name}</Typography>
                            </div>
                            <div>
                                <Typography variant="subtitle1">Phone:</Typography>
                                <Typography>{shippingInfo.phoneNo}</Typography>
                            </div>
                            <div>
                                <Typography variant="subtitle1">Address:</Typography>
                                <Typography>{address}</Typography>
                            </div>
                        </Box>
                        <br />
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Box className="shippingInfoBox">
                            <div className="subtotal-details">
                                <div className="subtotal-row">
                                    <Typography>Subtotal:</Typography>
                                    <Typography>
                                        Rs. {calculateSubtotal().toFixed(2)}
                                    </Typography>
                                </div>
                                <div className="tax-row">
                                    <Typography>
                                        + Tax ({(taxRate * 100).toFixed(0)}%):
                                    </Typography>
                                    <Typography>
                                        Rs. {(calculateSubtotal() * taxRate).toLocaleString()}.00
                                    </Typography>
                                </div>
                                <hr />
                                <div className="shipping-row">
                                    <Typography>
                                        + Shipping Charges:
                                    </Typography>
                                    <Typography>
                                        {shippingCharges === 0 && (
                                            <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>
                                                Rs. 200
                                            </span>
                                        )}
                                        Rs. {shippingCharges.toLocaleString()}.00
                                    </Typography>
                                </div>
                                <hr />
                                <div className="total-row">
                                    <Typography><b>Total:</b></Typography>
                                    <Typography>
                                        Rs. {totalPrice.toLocaleString()}.00
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                        <br />
                        <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={handleProceedToPayment}>
                            Proceed to Payment
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default ConfirmOrder;
