import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../../actions/orderAction';
import { CLEAR_ERRORS } from '../../../constants/orderConstants';
import { useAlert } from 'react-alert';
import { Audio } from 'react-loader-spinner';
import './MyOrders.css';
import MetaData from '../../../MetaData';
import { DataGrid } from '@material-ui/data-grid';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { orders, loading, error } = useSelector(state => state.myOrders);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleOrderClick = (params) => {
        navigate(`/order/${params.id}`)
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        dispatch(myOrders());
    }, [dispatch, alert, error])

    const columns = [
        {
            field: 'date',
            minWidth: 150,
            headerName: 'Ordered At',
            cellClassName:"table-cell",
            flex: 1
        },
        {
            field: 'shippingInfo',
            headerName: 'Shipping Info',
            minWidth: 350,
            cellClassName:"table-cell",
            flex: 2,
            renderCell: params => {
                return (
                    <div>
                        <div>
                            Address: {params.value.shippingInfo.address}, {params.value.shippingInfo.city}, {params.value.shippingInfo.state}, {params.value.shippingInfo.country}, {params.value.shippingInfo.pincode}
                        </div>
                        <div>Phone: {params.value.shippingInfo.phoneNo}</div>
                    </div>
                );
            }
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            flex: 1,
            cellClassName:"table-cell",
            minWidth: 150,
            renderCell: params => {
                return (
                    <div style={{ color: params.value === "Success" ? "green" : "red" }}>
                        {params.value}
                    </div>
                );
            }
        },
        {
            field: 'items',
            headerName: 'Order Items',
            flex: 1.5,
            cellClassName:"table-cell",
            renderCell: params => {
                return (
                    params.value.map(item => (
                        <div key={item._id}>
                            {item.name} - Quantity: {item.quantity}
                        </div>
                    ))
                );
            }
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            flex: 1,
            cellClassName:"table-cell",
            minWidth: 150,
            renderCell: params => {
                return (
                    <div>
                        Rs. {params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                );
            }
        },
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            flex: 1,
            minWidth: 150,
            cellClassName:"table-cell",
            renderCell: params => {
                return (
                    <div style={{ color: params.value === 'Delivered' ? 'green' : params.value === 'Shipped' ? 'orange' : params.value === 'Processing' ? 'red' : 'black' }}>
                        {params.value}
                    </div>
                );
            }
        },
    ];

    const rows = [];

    orders &&
        orders.forEach(order => {
            rows.push({
                id: order._id,
                date: formatDate(order.createdAt),
                shippingInfo: order,
                paymentStatus: order.paymentInfo.status === "succeeded" ? "Success" : "Failed",
                items: order.orderItems,
                totalPrice: order.totalPrice,
                orderStatus: order.orderStatus
            });
        });

    return (
        <>
            <MetaData title="My Orders" />
            {loading ? (
                <div className="loader">
                    <Audio color="#5953bc" height={150} width={150} />
                </div>
            ) : (
                <div className="productListContainer">
                    <h2>My Orders</h2>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="order-table"
                            autoHeight
                            onCellClick={handleOrderClick}
                        />
                    </div>
            )}
        </>
    );
};

export default MyOrders;
