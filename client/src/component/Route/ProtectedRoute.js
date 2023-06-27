import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Audio } from 'react-loader-spinner';
import { Navigate, Outlet } from 'react-router-dom';
import { loadUser } from '../../actions/userAction';

const loader = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px'
}

const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])
    return <>
        {loading ?
            <div style={loader}>
                <Audio color="#5953bc" height={150} width={150} />
            </div> : (
                <>
                    {
                        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
                    }
                </>
            )}
    </>
}
export default ProtectedRoute;