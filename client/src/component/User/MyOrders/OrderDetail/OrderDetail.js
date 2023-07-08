import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { orderDetails } from '../../../../actions/orderAction';
import { Audio } from 'react-loader-spinner';
import { CLEAR_ERRORS } from '../../../../constants/orderConstants';
import { Grid, Paper, Typography } from '@mui/material';
import MetaData from '../../../../MetaData';
import './OrderDetail.css';

const OrderDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const alert = useAlert();
    const { error, loading, order } = useSelector(state => state.orderDetails);
    const orderID = params.id;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        dispatch(orderDetails(orderID));
    }, [dispatch, orderID, alert, error]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        (loading !== undefined || loading === true) &&
        <>
            <MetaData title="Order Details" />
            {loading ? (
                <div className="loader">
                    <Audio color="#5953bc" height={150} width={150} />
                </div>
            ) :
                (
                    <div className="processOrderContainer" style={{ padding: '50px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Paper className="confirmShippingArea">
                                    <Typography variant="h5">Order Id:</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>
                                                {order && order._id}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <Typography variant="h5">Shipping Info:</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <Typography variant="h5">Payment:</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Payment Status:</p>
                                            <p
                                                className={
                                                    order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"
                                                }
                                            >
                                                {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                            </p>
                                        </div>
                                        <div>
                                            <p>Amount:</p>
                                            <span>Rs. {order.totalPrice && order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <Typography variant="h5">Order Status:</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                    {order.orderStatus === "Delivered" && (
                                        <>
                                            <hr />
                                            <Typography variant="h5">Delivered At:</Typography>
                                            <div className="orderDetailsContainerBox">
                                                <div>
                                                    <p>{order.deliveredAt && formatDate(order.deliveredAt)}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className="confirmOrderItems">
                                    <Typography variant="h4">Your Order Items:</Typography>
                                    <div className="confirmOrderItemsContainer">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <div onClick={() => Navigate(`/product/${item.product}`)} style={{ cursor: "pointer", maxWidth: "60%" }}>
                                                        <img src={item.image} alt="Product" />
                                                        <p>{item.name}</p>{" "}
                                                    </div>
                                                    <span style={{ maxWidth: "40%" }}>
                                                        {item.quantity} X Rs. {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} = <b>Rs. {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                )}
        </>
    );
};

export default OrderDetail;
