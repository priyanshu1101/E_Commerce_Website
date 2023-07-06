import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { orderDetails } from '../../../../actions/orderAction';
import { Audio } from 'react-loader-spinner';
import { CLEAR_ERRORS } from '../../../../constants/orderConstants';
import './OrderDetail.css';

const OrderDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
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

    return (
        <div className="order-detail">
            <h1 id="order-id">Order ID: {orderID}</h1>
            {loading === undefined || loading ? (
                <div className="loader">
                    <Audio color="#5953bc" height={150} width={150} />
                </div>
            ) : (
                order && (
                    <div className="order-content">
                        <div className="section">
                            <h2>Shipping Information</h2>
                            <p>{order.shippingInfo.address}</p>
                            <p>
                                {order.shippingInfo.city}, {order.shippingInfo.state}
                            </p>
                            <p>{order.shippingInfo.country}</p>
                            <p>Pincode: {order.shippingInfo.pincode}</p>
                            <p>Phone No: {order.shippingInfo.phoneNo}</p>
                        </div>

                        <div className="section">
                            <h2>Order Items</h2>
                            <div className="order-items">
                                {order.orderItems.map(item => (
                                    <div key={item._id} className="order-item">
                                        <img src={item.image} alt={item.name} />
                                        <div className="item-details">
                                            <p>{item.name}</p>
                                            <p>${item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="section">
                            <h2>Order Summary</h2>
                            <div className="summary-item">
                                <p>Items Price:</p>
                                <p>${order.itemsPrice}</p>
                            </div>
                            <div className="summary-item">
                                <p>Tax Price:</p>
                                <p>${order.taxPrice}</p>
                            </div>
                            <div className="summary-item">
                                <p>Total Price:</p>
                                <p>${order.totalPrice}</p>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default OrderDetail;
