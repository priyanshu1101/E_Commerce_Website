import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../../MetaData";
import { Button, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./PaymentGateway.css";
import { useNavigate } from "react-router-dom";
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { MdDateRange, MdOutlinePassword } from 'react-icons/md';
import { CLEAR_ERRORS } from "../../../constants/orderConstants";
import { createOrder } from "../../../actions/orderAction";
import { CLEAR_CART } from "../../../constants/cartConstants";
// import { createOrder, clearErrors } from "../../actions/orderAction";

const PaymentGateway = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);


    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });
            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));
                    localStorage.removeItem('cartItems');
                    dispatch({ type: CLEAR_CART })
                    Navigate("/success");
                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
    }, [dispatch, error, alert]);

    return (
        <div className="paymentMainContainer">
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography variant="h5">Card Info</Typography>
                    <div className="paymentInputContainer">
                        <BsFillCreditCard2BackFill className="paymentIcon" />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div className="paymentInputContainer">
                        <MdDateRange className="paymentIcon" />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div className="paymentInputContainer">
                        <MdOutlinePassword className="paymentIcon" />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <Button type="submit" ref={payBtn} className="paymentFormBtn" >
                        Pay - Rs. {orderInfo &&
                            orderInfo.totalPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PaymentGateway;
