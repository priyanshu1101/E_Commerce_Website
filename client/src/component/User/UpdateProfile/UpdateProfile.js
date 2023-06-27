import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateUserProfile } from '../../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants';
import MetaData from '../../../MetaData';
import Profile from "../../../images/Profile.jpg"
import { CLEAR_ERRORS } from '../../../constants/productConstants';
import { Audio } from 'react-loader-spinner';
import './UpdateProfile.css';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(state => state.profile)
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState(user);
  const [avatar, setAvatar] = useState(user.avatar.url);
  const { name, email } = userData;

  const handleSubmit = () => {
    dispatch(updateUserProfile({ name, email, avatar }))
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS })
    }
    if (isUpdated) {
      alert.success("User updated successfully !!");
      dispatch(loadUser());
      navigate('/account');
      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }
  }, [isUpdated, error, dispatch, navigate, alert])

  const handleFormChange = (e) => {
    if (e.target.id === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      if (file)
        reader.readAsDataURL(file);
    } else {
      setUserData({ ...userData, [e.target.id]: e.target.value });
    }
  };

  return (
    <>
      {loading ?
        <>
          <div className="loader">
            <Audio color="#5953bc" height={150} width={150} />
          </div>
        </>
        :
        <>
          <MetaData title={`Update Profile`} />
          <div className="profile-container">
            <div className="profile-wrapper">
              <div className="left-section">
                <h1 className="profile-heading">Profile</h1>
                <div
                  className={`profile-photo ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => { document.getElementById('avatar').click() }}
                >
                  <img src={avatar} alt={Profile} className="photo-image" />
                  {isHovered && <div className="upload-photo">Upload Photo</div>}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    id="avatar"
                    onChange={handleFormChange}
                    style={{ visibility: 'hidden' }}
                  />
                </div>
              </div>
              <div className="right-section">
                <div className="profile-info">
                  <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={handleFormChange} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleFormChange} />
                  </div>
                </div>
                <div className="profile-buttons">
                  <button className="change-button" onClick={handleSubmit}>
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default UpdateProfile;
