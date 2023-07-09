import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import ReactStars from 'react-rating-stars-component';
import { DataGrid } from '@material-ui/data-grid';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import MetaData from '../../../../MetaData';
import { CLEAR_ERRORS, DELETE_REVIEW_RESET, PRODUCT_REVIEWS_RESET } from '../../../../constants/productConstants';
import { delteProductReview, fetchProductReviews } from '../../../../actions/productAction';
import './ReviewList.css'

const ReviewList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = {
        edit: false,
        color2: '#ffa41c',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true,
    };

    const { reviews, error, success } = useSelector(state => state.productFunctionsForAdmin);
    const [productId, setProductId] = useState('');

    const handleDeleteButton = (id) => {
        dispatch(delteProductReview(productId, id));
    };

    useEffect(() => {
        if (error && productId.length === 24) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (success) {
            alert.success('Review has been deleted successfully!!');
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, success, productId]);

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(fetchProductReviews(productId));
        } else {
            dispatch({ type: PRODUCT_REVIEWS_RESET });
        }
    }, [dispatch, productId]);

    const columns = [
        {
            field: 'id',
            headerName: 'Review ID',
            minWidth: 200,
            flex: 0.3
        },
        {
            field: 'username',
            headerName: 'User',
            minWidth: 200,
            flex: 0.3,
        },
        {
            field: 'comment',
            headerName: 'Comment',
            minWidth: 150,
            flex: 0.5
        },
        {
            field: 'rating',
            headerName: 'Rating',
            minWidth: 150,
            flex: 0.3,
            renderCell: params => {
                return (
                    <div>
                        <ReactStars {...options} value={params.value} />
                    </div>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.2,
            sortable: false,
            renderCell: params => {
                return (
                    <div className="actions-cell">
                        <Button onClick={() => handleDeleteButton(params.id)}>
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            }
        }
    ];

    const rows = reviews
        ? reviews.map(review => ({
            id: review._id,
            username: review.name,
            comment: review.comment,
            rating: review.rating,
        }))
        : [];

    return (
        <>
            <MetaData title="Product Reviews -- Admin" />
            <div className="dashboard">
                <Sidebar />
                <div className="reviewListContainer">
                    <h1 id="reviewListHeading">Product Reviews</h1>
                    <div className="input-container">
                        <FingerprintIcon className="input-icon" />
                        <TextField
                            label="Product Id"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="reviewListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    );
};

export default ReviewList;
