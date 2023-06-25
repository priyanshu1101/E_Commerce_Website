import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { gapi } from 'gapi-script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import "./GoogleAuth.css";
import { googleAuth } from '../../../../actions/userAction';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const handleLoginSuccess = async (response) => {
        const { googleId, imageUrl, email, name } = response.profileObj;
        dispatch(googleAuth({ googleId, imageUrl, email, name, accessToken: response.accessToken }));
    };

    const handleLoginFailure = (error) => {
        toast.error(error);
    };

    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: process.env.REACT_APP_CLIENT_ID,
                scope: 'email profile',
            });
        });
    }, []);

    return (
        <div className="google-auth">
            <ToastContainer />
            <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText="Sign in with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy="single_host_origin"
                render={renderProps => (
                    <button className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <span>Sign in with Google</span>
                        <AiFillGoogleCircle className="google-icon" />
                    </button>
                )}
            />
        </div>
    );
};

export default GoogleAuth;
