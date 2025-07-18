import React, { useEffect, useState } from 'react';
import GoogleAuth from './GoogleAuth/GoogleAuth';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, login, register } from '../../../actions/userAction';
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import profilePng from '../../../images/Profile.jpg';
import { CLEAR_ERRORS } from '../../../constants/productConstants';
import { FORGOT_PASSWORD_RESET } from '../../../constants/userConstants';
import MetaData from '../../../MetaData';
import { FaUser, FaEnvelope, FaLock, FaImage, FaArrowLeft } from 'react-icons/fa';
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
    setUser({ name: '', email: '', password: '', avatar: profilePng });
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

  if (loading || forgotPasswordeLoading) {
    return (
      <div className="loader">
        <div className="loading-spinner"></div>
        <span className="loading-text">Please wait...</span>
      </div>
    );
  }

  return (
    <div className="login-signup-container">
      <MetaData title={showForgotPassword ? "Forgot Password" : (isLogin ? "Login" : "Register")} />
      
      <div className="login-signup-card">
        <div className="form-header">
          <h2>
            {showForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Create Account')}
          </h2>
          <p>
            {showForgotPassword 
              ? 'Enter your email to reset your password' 
              : (isLogin 
                ? 'Sign in to your account to continue' 
                : 'Join us and start shopping today'
              )
            }
          </p>
        </div>

        <div className="form-content">
          {!showForgotPassword ? (
            <>
              <form onSubmit={handleSubmit} encType={isLogin ? "application/json" : "multipart/form-data"}>
                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="name">
                      <FaUser size={14} style={{ marginRight: '0.5rem' }} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-input"
                      value={name}
                      onChange={handleFormChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope size={14} style={{ marginRight: '0.5rem' }} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={email}
                    onChange={handleFormChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <FaLock size={14} style={{ marginRight: '0.5rem' }} />
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    value={password}
                    onChange={handleFormChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="avatar">
                      <FaImage size={14} style={{ marginRight: '0.5rem' }} />
                      Profile Picture
                    </label>
                    <div className="avatar-upload">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        id="avatar"
                        className="form-input"
                        onChange={handleFormChange}
                      />
                      <div className="avatar-preview">
                        <img src={avatar} alt="Avatar Preview" />
                      </div>
                    </div>
                  </div>
                )}

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>

                {isLogin && (
                  <div className="forgot-password">
                    <button type="button" onClick={() => setShowForgotPassword(true)}>
                      Forgot your password?
                    </button>
                  </div>
                )}
              </form>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="google-auth">
                <GoogleAuth />
              </div>

              <div className="switch-option">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <a href="#" onClick={handleSwitch}>
                  {isLogin ? 'Sign up' : 'Sign in'}
                </a>
              </div>
            </>
          ) : (
            <div className="forgot-password-form">
              <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope size={14} style={{ marginRight: '0.5rem' }} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={email}
                    onChange={handleFormChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <button type="submit" className="submit-button" disabled={forgotPasswordeLoading}>
                  {forgotPasswordeLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="back-to-login">
                <a href="#" onClick={(e) => { e.preventDefault(); setShowForgotPassword(false) }}>
                  <FaArrowLeft size={12} style={{ marginRight: '0.5rem' }} />
                  Back to login
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;