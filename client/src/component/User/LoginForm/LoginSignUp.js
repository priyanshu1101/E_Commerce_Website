import React, { useEffect, useState } from 'react';
import GoogleAuth from './GoogleAuth/GoogleAuth';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../../actions/userAction';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Audio } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword } from '../../../api/user';
import profilePng from '../../../images/Profile.jpg';
import './LoginSignUp.css';

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

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
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      dispatch(login({ email, password }));
    } else {
      var formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);
      dispatch(register(formData));
    }
  };

  const handleForgotPassword = async (e) => {
    try {
      e.preventDefault();
      const { data } = await forgotPassword({ email });
      toast.success(data.message);
      setTimeout(() => {
        setShowForgotPassword(false);
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setShowForgotPassword(false);
  };

  useEffect(() => {
    if (error)
      toast.error(error);
    if (isAuthenticated)
      Navigate("/account");
  }, [error, isAuthenticated, Navigate]);

  return (
    loading ? (
      <div className="loader">
        <Audio color="#5953bc" height={150} width={150} />
      </div>
    ) : (
      <div className="container">
        <ToastContainer />
        <div className={`login-signup-card ${isLogin ? 'login' : 'register'}`}>
          <div className="form-card">
            {!showForgotPassword ? (
              <>
                <form onSubmit={handleSubmit} encType={isLogin ? "application/json" : "multipart/form-data"}>
                  <h2>{isLogin ? 'Login' : 'Register'}</h2>
                  {!isLogin && (
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
                  )}
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
                  <button onClick={handleSwitch}>{isLogin ? 'Register' : 'Login'}</button>
                </div>
              </>
            ) : (
              <div className="forgot-password-form">
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
                    Reset Password
                  </button>
                </form>
                <div className="switch-option">
                  Remember your password?
                  <button onClick={() => setShowForgotPassword(false)}>Login</button>
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
      </div>
    )
  );
};

export default LoginSignUp;
