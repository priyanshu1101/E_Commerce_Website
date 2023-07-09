import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Grid, Paper, Select, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Audio } from "react-loader-spinner";
import { orderDetails, updateOrder } from "../../../../actions/orderAction";
import { ADMIN_ORDER_UPDATE_RESET, CLEAR_ERRORS } from "../../../../constants/orderConstants";
import MetaData from "../../../../MetaData";
import SideBar from "../Sidebar/Sidebar";
import "./ProcessOrder.css";

const ProcessOrder = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const Navigate = useNavigate();
    const alert = useAlert();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { success, error: updateError } = useSelector((state) => state.orderFunctionsForAdmin);
    const [status, setStatus] = useState("");

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(params.id, myForm));
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        if (error || updateError) {
            alert.error(error || updateError);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (success) {
            alert.success("Order status has been updated successfully!!");
            dispatch({ type: ADMIN_ORDER_UPDATE_RESET });
        }
        dispatch(orderDetails(params.id));
    }, [dispatch, params.id, error, alert, success, updateError]);

    return (
        (loading !== undefined || loading === true) &&
        <>
            <MetaData title="Process Order -- Admin" />
            <div className="dashboard">
                <SideBar />
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
                                                        <div onClick={() => Navigate(`/products/product/${item.product}`)} style={{ cursor: "pointer", maxWidth: "60%" }}>
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
                                    {order.orderStatus !== "Delivered" && (
                                        <Paper className="updateOrderForm">
                                            <form onSubmit={updateOrderSubmitHandler}>
                                                <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>Process Order</Typography>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AccountTreeIcon style={{ marginRight: '10px' }} />
                                                    <Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%' }}>
                                                        <MenuItem value="">Choose Category</MenuItem>
                                                        {order.orderStatus === "Processing" && <MenuItem value="Shipped">Shipped</MenuItem>}
                                                        {order.orderStatus === "Shipped" && <MenuItem value="Delivered">Delivered</MenuItem>}
                                                    </Select>
                                                </div>
                                                <Button
                                                    id="createProductBtn"
                                                    type="submit"
                                                    disabled={loading || status === ""}
                                                    variant="contained"
                                                    color="secondary"
                                                    style={{ width: '100%', marginBottom: '20px' }}
                                                >
                                                    Process
                                                </Button>
                                            </form>
                                        </Paper>

                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    )}
            </div >
        </>
    );
};

export default ProcessOrder;
