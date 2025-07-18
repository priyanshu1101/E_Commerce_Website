import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FaGoogle } from 'react-icons/fa';
import { gapi } from 'gapi-script';
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux';
import { googleAuth } from '../../../../actions/userAction';
import { fetchGoogleId } from '../../../../api/user';
import "./GoogleAuth.css";

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [clientId, setClientId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLoginSuccess = async (response) => {
        setLoading(true);
        try {
            const { googleId, imageUrl, email, name } = response.profileObj;
            dispatch(googleAuth({ googleId, imageUrl, email, name, accessToken: response.accessToken }));
        } catch (error) {
            alert.error('Google authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginFailure = (error) => {
        console.error('Google login failed:', error);
        alert.error('Google authentication failed. Please try again.');
        setLoading(false);
    };

    const getGoogleClientId = async () => {
        try {
            const { data } = await fetchGoogleId();
            setClientId(data.googleClientId);
        } catch (error) {
            console.error('Failed to fetch Google client ID:', error);
        }
    }

    useEffect(() => {
        getGoogleClientId();
    }, []);

    useEffect(() => {
        if (clientId) {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    clientId: clientId,
                    scope: 'email profile',
                });
            });
        }
    }, [clientId]);

    if (!clientId) {
        return (
            <button className="google-auth-button" disabled>
                <div className="google-icon">
                    <FaGoogle size={12} />
                </div>
                Loading...
            </button>
        );
    }

    return (
        <div className="google-auth">
            <GoogleLogin
                clientId={clientId}
                buttonText="Continue with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy="single_host_origin"
                disabled={loading}
                render={renderProps => (
                    <button 
                        className={`google-auth-button ${loading ? 'loading' : ''}`}
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled || loading}
                    >
                        <div className="google-icon">
                            <FaGoogle size={12} />
                        </div>
                        {loading ? 'Signing in...' : 'Continue with Google'}
                    </button>
                )}
            />
        </div>
    );
};

export default GoogleAuth;