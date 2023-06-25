import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isAuthenticated !== true) {
            navigate('/login');
            return () => { };
        }
    }, [isAuthenticated, navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    const handlePhotoUpload = () => {
        // Implement photo upload functionality
        console.log('Upload a new photo');
    };

    const handleMyOrders = () => {
        // Navigate to My Orders page
        navigate('/orders');
    };

    const handleEditProfile = () => {
        // Navigate to edit profile page
        navigate('/edit-profile');
    };

    const handleChangePassword = () => {
        // Navigate to change password page
        navigate('/password/update');
    };

    return (
        <div className="profile-container">
            {(loading === undefined || loading) ?
                (
                    <Audio />
                ) :
                (
                    <div className="profile-wrapper">
                        <div className="left-section">
                            <h1 className="profile-heading">Profile</h1>
                            <div
                                className={`profile-photo ${isHovered ? 'hovered' : ''}`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <img src={user.avatar.url} alt={user.name} className="photo-image" />
                                {isHovered && (
                                    <div className="upload-photo" onClick={handlePhotoUpload}>
                                        Upload Photo
                                    </div>
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
                )}
        </div>
    );
};

export default Profile;
