import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Grid, Paper, Select, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Audio } from "react-loader-spinner";
import MetaData from "../../../../MetaData";
import SideBar from "../Sidebar/Sidebar";
import { ADMIN_USER_UPDATE_RESET, CLEAR_ERRORS } from "../../../../constants/userConstants";
import { fetchUserDetails, updateUser } from "../../../../actions/userAction";
import { Input } from "@mui/material";
import { FcGoogle } from 'react-icons/fc'
import Website from '../../../../images/Website.ico';
import "./UpdateUser.css";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    const { user, loading, error, success } = useSelector(state => state.userFunctionForAdmin)
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("role", role);
        dispatch(updateUser(params.id, myForm));
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (success) {
            alert.success("User is modified successfully!!");
            dispatch({ type: ADMIN_USER_UPDATE_RESET });
            navigate('/admin/users')
        }
        dispatch(fetchUserDetails(params.id));
    }, [dispatch, params.id, error, success, navigate, alert]);

    useEffect(() => {
        setName(user && user.name);
    }, [user])

    return (
        <>
            <MetaData title="Update User -- Admin" />
            <div className="dashboard">
                <SideBar />
                {(loading === undefined || loading === true || user === undefined) ? (
                    <div className="loader">
                        <Audio color="#5953bc" height={150} width={150} />
                    </div>
                ) :
                    (
                        <div className="updateUserContainer" style={{ padding: '50px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Paper className="userInfoArea">
                                        <Typography variant="h5">User Info:</Typography>
                                        <div className="userDetailsContainerBox">
                                            <div>
                                                <img src={user.avatar.url} alt={user.name} style={{ borderRadius: '100%', height: '200px', width: 'auto', margin: '2rem auto' }}></img>
                                            </div>
                                            <div>
                                                <p>User Id:</p>
                                                <span>#{user && user._id}</span>
                                            </div>
                                            <div>
                                                <p>Name:</p>
                                                <span>{user && user.name}</span>
                                            </div>
                                            <div>
                                                <p>Email:</p>
                                                <span>
                                                    {user && user.email}
                                                </span>
                                            </div>
                                            <div>
                                                <p>Role:</p>
                                                <b className={user.role === "admin" ? 'redColor' : 'greenColor'} style={{ fontSize: '20px' }}>
                                                    {user && user.role === "admin" ? "Admin" : "User"}
                                                </b>
                                            </div>
                                            <div>
                                                <p>User Type:</p>
                                                <span>
                                                    {user && user.userType === "google" ? <FcGoogle size={25}/> : <img src={Website} alt="Website" style={{ width: '30px' }} />}
                                                </span>
                                            </div>
                                        </div>
                                        <hr />
                                        <Typography variant="h5">Account Created On:</Typography>
                                        <div className="userDetailsContainerBox">
                                            <div>
                                                <p>{user && formatDate(user.createdAt)}</p>
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper className="updateUserForm">
                                        <form onSubmit={updateUserSubmitHandler}>
                                            <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>Update User</Typography>
                                            <div>
                                                <label htmlFor="nameInput" style={{ marginRight: '10px' }}>Name:</label>
                                                <Input value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'left' }}>
                                                <label style={{ marginRight: '15px' }}>Role:</label>
                                                <Select value={role} onChange={(e) => setRole(e.target.value)} >
                                                    <MenuItem value="">Choose Role</MenuItem>
                                                    {user.role === "user" && <MenuItem value="admin">Admin</MenuItem>}
                                                    {user.role === "admin" && <MenuItem value="user">User</MenuItem>}
                                                </Select>
                                            </div>
                                            <Button
                                                id="updateUserBtn"
                                                type="submit"
                                                disabled={loading}
                                                variant="contained"
                                                color="secondary"
                                                style={{ width: '100%', marginBottom: '20px' }}
                                            >
                                                Update User
                                            </Button>
                                        </form>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    )}
            </div>
        </>
    );
};

export default UpdateUser;
