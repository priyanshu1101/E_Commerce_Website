import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";

const GoogleAuth = () => {
    const handleLoginSuccess = (response) => {
        // Handle successful login
        console.log('Login successful:', response);
    };

    const handleLoginFailure = (error) => {
        // Handle login failure
        console.log('Login failed:', error);
    };
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId:
                    process.env.REACT_APP_CLIENT_ID,
            });
        });
    }, [])

    return (
        <div>
            <h1>Google Authentication</h1>
            <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText="Sign in with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleAuth;
