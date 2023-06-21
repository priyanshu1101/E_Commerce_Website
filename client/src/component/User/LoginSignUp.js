import React, { useState } from 'react';
import './LoginSignUp.css';
import GoogleAuth from './GoogleAuth/GoogleAuth';

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can access the form fields using the state variables (name, email, password, profilePicture)
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="container">
      <div className={`login-signup-card ${isLogin ? 'login' : 'register'}`}>
        <div className="form-card">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          {!showForgotPassword ? (
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="profilePicture">Profile Picture</label>
                  <input
                    type="file"
                    id="profilePicture"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                  />
                </div>
              )}
              <button type="submit" className="submit-button">
                {isLogin ? 'Login' : 'Register'}
              </button>
              {!isLogin && (
                <div className="forgot-password">
                  <button onClick={handleForgotPassword}>Forgot Password?</button>
                </div>
              )}
            </form>
          ) : (
            <div className="forgot-password-form">
              <p>Please enter your email address to reset your password.</p>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="submit-button">
                  Reset Password
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="switch-option">
          {isLogin ? 'Need an account?' : 'Already have an account?'}
          <button onClick={handleSwitch}>{isLogin ? 'Register' : 'Login'}</button>
        </div>
        <div className="google-auth">
          <GoogleAuth/>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
