import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar';
import { Audio } from 'react-loader-spinner';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../../../../MetaData';
import { deleteUser, fetchUsers } from '../../../../actions/userAction';
import { ADMIN_USER_DELETE_RESET, CLEAR_ERRORS } from '../../../../constants/userConstants';

const UserList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { users, loading, error, success } = useSelector(state => state.userFunctionForAdmin)
    const { user } = useSelector(state => state.user);

    console.log(loading);
    const handleDeleteButton = (id) => {
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (success) {
            alert.success("User deleted successfully!!");
            dispatch({ type: ADMIN_USER_DELETE_RESET });
        }
        dispatch(fetchUsers());
    }, [dispatch, alert, error, success])

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 0.2
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 150,
            flex: 0.2
        },
        {
            field: 'id',
            headerName: 'User ID',
            minWidth: 150,
            flex: 0.2
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 150,
            flex: 0.1,
            renderCell: params => {
                return (
                    <div style={params.value === "Admin" ? { color: 'red' } : { color: 'green' }}>
                        {params.value} {user._id === params.id && "(Me)"}
                    </div>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'number',
            minWidth: 150,
            flex: 0.1,
            sortable: false,
            renderCell: params => {
                return (
                    <div className="actions-cell" style={user._id === params.id ? { visibility: 'hidden' } : {}}>
                        <Link to={`/admin/user/update/${params.getValue(params.id, 'id')}`}>
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

    const rows = [];

    users &&
        users.forEach(user => {
            rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role === 'admin' ? "Admin" : "User"
            });
        });

    return (
        <>
            <MetaData title="All Users -- Admin" />
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

export default UserList;