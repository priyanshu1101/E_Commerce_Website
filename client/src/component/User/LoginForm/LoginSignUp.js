import React, { useEffect, useState } from 'react';
import GoogleAuth from './GoogleAuth/GoogleAuth';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, login, register } from '../../../actions/userAction';
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import { Audio } from 'react-loader-spinner';
import profilePng from '../../../images/Profile.jpg';
import { CLEAR_ERRORS } from '../../../constants/productConstants';
import { FORGOT_PASSWORD_RESET } from '../../../constants/userConstants';
import MetaData from '../../../MetaData';
import './LoginSignUp.css';

const LoginSignUp = ({ location }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);
  const { error: forgotPassworderror, loading: forgotPasswordeLoading, message } = useSelector(state => state.forgotPassword);

  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [user, setUser] = useState({ name: '', email: '', password: '', avatar: profilePng });
  const { name, email, password, avatar } = user;

  const handleFormChange = (e) => {
    if (e.target.id === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUser({ ...user, avatar: reader.result });
        }
      };
      if (file)
        reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      dispatch(login({ email, password }));
    } else {
      var formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (avatar === profilePng) {
        try {
          const response = await fetch(profilePng);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;
            formData.append("avatar", base64Image);
            dispatch(register(formData));
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.log('Error fetching the image:', error);
        }
      }
      else {
        formData.append("avatar", avatar);
        dispatch(register(formData));
      }
    }
  };

  const handleForgotPassword = async (e) => {
    try {
      e.preventDefault();
      dispatch(forgotPassword({ email }))
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  const handleSwitch = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setShowForgotPassword(false);
  };

  const redirect = window.location.search ? window.location.search.split('=')[1] : "/account";

  useEffect(() => {
    if (error || forgotPassworderror) {
      alert.error(error || forgotPassworderror);
      dispatch({ type: CLEAR_ERRORS })
    }
    if (isAuthenticated) {
      Navigate(redirect)
      if (redirect === '/account')
        alert.success("Logged in successfully !!")
    }
    if (message) {
      alert.success(message)
      dispatch({ type: FORGOT_PASSWORD_RESET });
      setShowForgotPassword(false)
    }
  }, [error, isAuthenticated, Navigate, dispatch, forgotPassworderror, message, alert, redirect]);

  return (
    (loading || forgotPasswordeLoading) ? (
      <div className="loader">
        <Audio color="#5953bc" height={150} width={150} />
      </div>
    ) : (
      <div className="login-signup-container"> {/* Updated class name */}
        <div className={`login-signup-card ${isLogin ? 'login' : 'register'}`}>
          <div className="form-card">
            {!showForgotPassword ? (
              <>
                <form onSubmit={handleSubmit} encType={isLogin ? "application/json" : "multipart/form-data"}>
                  <h2>{isLogin ? 'Login' : 'Register'}</h2>
                  {!isLogin && (
                    <>
                      <MetaData title="Register Form" />
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </>
                  )}
                  <MetaData title="Login Form" />
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  {!isLogin && (
                    <div className="form-group">
                      <label htmlFor="avatar">Profile Picture</label>
                      <div className="avatar-upload">
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          id="avatar"
                          onChange={handleFormChange}
                        />
                        <div className="avatar-preview">
                          <img src={avatar} alt="Avatar Preview" />
                        </div>
                      </div>
                    </div>
                  )}
                  <button type="submit" className="submit-button">
                    {isLogin ? 'Login' : 'Register'}
                  </button>
                  {isLogin && (
                    <div className="forgot-password">
                      <button onClick={() => setShowForgotPassword(true)}>Forgot Password?</button>
                    </div>
                  )}

                </form>
                <div className="switch-option">
                  {isLogin ? 'Need an account?' : 'Already have an account?'}
                  <a href="/#" onClick={handleSwitch}>{isLogin ? 'Register' : 'Login'}</a>
                </div>
              </>
            ) : (
              <div className="forgot-password-form">
                <MetaData title="Forgot Password" />
                <h2>Forgot Password</h2>
                <p>Please enter your email address to reset your password.</p>
                <form onSubmit={handleForgotPassword}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-button">
                    Forgot Password
                  </button>
                </form>
                <div className="switch-option">
                  Remember your password?
                  <a href='/#' onClick={(e) => { e.preventDefault(); setShowForgotPassword(false) }}>Login</a>
                </div>
              </div>
            )}
          </div>
          {!showForgotPassword && (
            <div className="google-auth">
              <GoogleAuth />
            </div>
          )}
        </div>
      </div >
    )
  );
};

export default LoginSignUp;
