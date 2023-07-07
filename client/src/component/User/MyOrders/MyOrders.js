import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../../actions/orderAction';
import { CLEAR_ERRORS } from '../../../constants/orderConstants';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Audio } from 'react-loader-spinner';
import './MyOrders.css';

const MyOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { orders, loading, error } = useSelector(state => state.myOrders);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        dispatch(myOrders());
    }, [dispatch, alert, error]);

    // Format the date to a user-readable format (e.g., "July 1, 2023")
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="my-orders-container">
            <h2>My Orders</h2>
            {(loading === undefined || loading) ? (
                <div className="loader">
                    <Audio color="#5953bc" height={150} width={150} />
                </div>

            ) : (
                <div className="table-container">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Shipping Info</th>
                                <th>Payment Status</th>
                                <th>Items</th>
                                <th>Total Price</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} onClick={() => navigate(`/order/${order._id}`)} style={{ cursor: 'pointer' }}>
                                    <td>{order._id}</td>
                                    <td>{formatDate(order.createdAt)}</td>
                                    <td>
                                        <div>
                                            Address: {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.country}, {order.shippingInfo.pinCode}
                                        </div>
                                        <div>Phone: {order.shippingInfo.phoneNo}</div>
                                    </td>
                                    <td>
                                        <span className={`status ${order.paymentInfo.status === 'succeeded' ? 'succeeded' : 'failed'}`}>
                                            {order.paymentInfo.status === "succeeded" ? 'Success' : 'Failed'}
                                        </span>
                                    </td>
                                    <td>
                                        {order.orderItems.map(item => (
                                            <div key={item._id}>
                                                {item.name} - Quantity: {item.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td>Rs. {order.totalPrice.toLocaleString()}</td>
                                    <td>
                                        <span className={`status ${order.orderStatus === 'Processing' ? 'Processing' : 'Delivered'}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
