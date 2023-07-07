import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProductsForAdmin } from '../../../../actions/productAction';
import { CLEAR_ERRORS, DELETE_PRODUCT_RESET } from '../../../../constants/productConstants';
import { useAlert } from 'react-alert';
import { Audio } from 'react-loader-spinner';
import Metadata from '../../../../MetaData';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from '../Sidebar/Sidebar';
import './ProductList.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, products, error } = useSelector(state => state.products);
    const { success, error: DeleteError } = useSelector(state => state.productFunctionsForAdmin)

    const handleDeleteButton = (id) => {
        dispatch(deleteProduct(id));
    }

    const columns = [
        {
            field: 'preview',
            headerName: 'Preview',
            minWidth: 150,
            flex: 0.4,
            renderCell: params => {
                return (
                    <div className="image-cell">
                        <img src={params.value.image} alt={params.value.name} />
                    </div>
                );
            }
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'id',
            headerName: 'Product ID',
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            minWidth: 150,
            flex: 0.3
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 150,
            flex: 0.3
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
                        <Link to={`/admin/product/update/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => handleDeleteButton(params.id)}>
                            <DeleteIcon />
                        </Button>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (DeleteError) {
            alert.error(DeleteError);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (success) {
            alert.success("Product Deleted Successfully!!");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getProductsForAdmin());
    }, [dispatch, error, alert, success, DeleteError]);

    const rows = [];

    products &&
        products.forEach(item => {
            rows.push({
                preview: { image: item.images[0].url, name: item.name },
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name
            });
        });

    return (
        <>
            <Metadata title="All Products -- Admin" />
            <div className="dashboard">
                <SideBar />
                {loading ? (
                    <div className="loader">
                        <Audio color="#5953bc" height={150} width={150} />
                    </div>
                ) : (
                    <div className="productListContainer">
                        <h1 id="productListHeading">All Products</h1>
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
    );
};

export default ProductList;
