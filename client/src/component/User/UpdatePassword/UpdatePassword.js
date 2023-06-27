import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiLockPasswordFill, RiCheckLine } from 'react-icons/ri';
import { loadUser, resetPassword, updatePassword } from '../../../actions/userAction';
import { CLEAR_ERRORS, RESET_PASSWORD_RESET, UPDATE_PASSWORD_RESET } from '../../../constants/userConstants';
import { useAlert } from 'react-alert'
import { Audio } from 'react-loader-spinner';
import './UpdatePassword.css';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const params = useParams();
    const { token } = params;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { isUpdated, error, loading } = useSelector(state => state.profile);
    const { error: resetPasswordError, loading: resetPasswordLoading, success } = useSelector(state => state.forgotPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (token) {
            dispatch(resetPassword({ newPassword, confirmPassword, token }))
        }
        else {
            dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
        }
    };
    useEffect(() => {
        if (error || resetPasswordError) {
            alert.error(error || resetPasswordError);
            dispatch({ type: CLEAR_ERRORS });
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully !!");
            navigate('/login');
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }
        if (success) {
            alert.success("Password Reset Successfully !!");
            navigate('/login');
            dispatch({ type: RESET_PASSWORD_RESET })
            dispatch(loadUser());
        }
    }, [navigate, dispatch, error, isUpdated, success, resetPasswordError, alert])
    return (
        (loading || resetPasswordLoading) ?
            <div className="loader">
                <Audio color="#5953bc" height={150} width={150} />
            </div>
            :
            <>
                <div className="container">
                    <div className="card">
                        <h2>{token ? "Reset Password" : "Update Password"}</h2>
                        <form onSubmit={handleSubmit}>
                            {!token && <div className="form-group">
                                <label htmlFor="oldPassword">
                                    <RiLockPasswordFill className="icon" />
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>}
                            <div className="form-group">
                                <label htmlFor="password">
                                    <RiLockPasswordFill className="icon" />
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">
                                    <RiLockPasswordFill className="icon" />
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="update-button">
                                <RiCheckLine className="icon" />
                                {token ? "Reset Password" : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </>
    );
};

export default UpdatePassword;
