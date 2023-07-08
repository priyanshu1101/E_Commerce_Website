import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { gapi } from 'gapi-script';
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux';
import "./GoogleAuth.css";
import { googleAuth } from '../../../../actions/userAction';
import { fetchGoogleId } from '../../../../api/user';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [clientId, setClientId] = useState(null);
    const handleLoginSuccess = async (response) => {
        const { googleId, imageUrl, email, name } = response.profileObj;
        dispatch(googleAuth({ googleId, imageUrl, email, name, accessToken: response.accessToken }));
    };

    const handleLoginFailure = (error) => {
        alert.error(error);
    };

    const getGoogleClientId = async () => {
        try {
            const { data } = await fetchGoogleId();
            setClientId(data.googleClientId);
        } catch (error) {
            alert.error(error);
        }
    }

    useEffect(() => {
        getGoogleClientId();
    })

    useEffect(() => {
        (clientId !== null) &&
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    clientId: clientId && clientId,
                    scope: 'email profile',
                });
            });
    }, [clientId]);

    return (
        <div className="google-auth">
            {(clientId !== null) &&
                <GoogleLogin
                    clientId={clientId}
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
                />}
        </div>
    );
};

export default GoogleAuth;
