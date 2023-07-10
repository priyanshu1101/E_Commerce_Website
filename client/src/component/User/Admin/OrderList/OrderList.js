import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, fetchAllOrdersForAdmin } from '../../../../actions/orderAction';
import { ADMIN_ORDER_DELETE_RESET, CLEAR_ERRORS } from '../../../../constants/orderConstants';
import Sidebar from '../Sidebar/Sidebar';
import { Audio } from 'react-loader-spinner';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../../../../MetaData';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the default styles

import { confirmAlert } from 'react-confirm-alert'; // Import the confirmation dialog


const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { orders, loading, error, success } = useSelector(state => state.orderFunctionsForAdmin)

    const handleDeleteButton = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this order?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => dispatch(deleteOrder(id)),
                },
                {
                    label: 'No',
                },
            ],
        });
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (success) {
            alert.success("Order has been deleted successfully!!");
            dispatch({ type: ADMIN_ORDER_DELETE_RESET });
        }
        dispatch(fetchAllOrdersForAdmin());
    }, [dispatch, alert, error, success])

    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 200,
            flex: 0.3,
            renderCell: params => {
                return (
                    <div style={{ color: params.value === 'Delivered' ? 'green' : params.value === 'Shipped' ? 'orange' : params.value === 'Processing' ? 'red' : 'black' }}>
                        {params.value}
                    </div>
                );
            }
        },
        {
            field: 'itemQty',
            headerName: 'Item Quantity',
            type: 'number',
            minWidth: 150,
            flex: 0.3
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
            renderCell: params => {
                return (
                    <div style={{ textAlign: 'left' }}>
                        Rs. {params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: params => {
                return (
                    <div className="actions-cell">
                        <Link to={`/admin/order/update/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => handleDeleteButton(params.id)} disabled={loading}>
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            }
        }
    ];

    const rows = [];

    orders &&
        orders.forEach(order => {
            rows.push({
                id: order._id,
                status: order.orderStatus,
                itemQty: order.orderItems[0].quantity,
                amount: order.totalPrice,
            });
        });

    return (
        <>
            <MetaData title="All Orders -- Admin" />
            <div className="dashboard">
                <Sidebar />
                {loading ? (
                    <div className="loader">
                        <Audio color="#5953bc" height={150} width={150} />
                    </div>
                ) : (
                    <div className="productListContainer">
                        <h1 id="productListHeading">All Orders</h1>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default OrderList