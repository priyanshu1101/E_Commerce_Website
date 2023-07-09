import React from 'react';
import { useSelector } from 'react-redux';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../../MetaData';
import Avatar from 'react-avatar';
import './Profile.css';

const Profile = () => {
    const { loading, user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    const handleMyOrders = () => {
        navigate('/orders');
    };

    const handleEditProfile = () => {
        navigate('/account/update');
    };

    const handleChangePassword = () => {
        navigate('/account/updatePassword');
    };

    return (
        (loading === undefined || loading || user === undefined) ? (
            <div className="loader">
                <Audio color="#5953bc" height={150} width={150} />
            </div>
        ) : (
            <div className="profile-container">
                <MetaData title={`${user.name} -- Profile`} />
                <div className="profile-wrapper">
                    <div className="left-section">
                        <h1 className="profile-heading">Profile</h1>
                        <div className="profile-photo">
                            {user.avatar.url !== "" ? (
                                <img src={user.avatar.url} alt={user.name} className="photo-image" />
                            ) : (
                                <Avatar name={user.name[0]} className="photo-image" />
                            )}
                        </div>
                        <button className="edit-button" onClick={handleEditProfile}>
                            Edit Profile
                        </button>
                    </div>
                    <div className="right-section">
                        <div className="profile-info">
                            <h3 className="label">Full Name:</h3>
                            <p className="profile-text">{user.name}</p>
                            <h3 className="label">Email:</h3>
                            <p className="profile-text">{user.email}</p>
                            <h3 className="label">Member Since:</h3>
                            <p className="profile-text">{formatDate(user.createdAt)}</p>
                        </div>
                        <div className="profile-buttons">
                            <button className="my-orders-button" onClick={handleMyOrders}>
                                My Orders
                            </button>
                            <button className="change-button" onClick={handleChangePassword}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;
