import React, { useState } from 'react'
import './UserOptions.css';
import { SpeedDial, SpeedDialAction, Backdrop } from '@mui/material';
import { MdDashboard } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { MdExitToApp } from "react-icons/md";
import { FaListAlt } from "react-icons/fa"
import profilePng from '../../../../images/Profile.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../../../../actions/userAction';

const UserOptions = ({ user }) => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [open, setOpen] = useState(false);
    var options = [
        { icon: <FaListAlt />, name: "Orders", func: orders },
        { icon: <BsFillPersonFill />, name: "Profile", func: account },
        { icon: <MdExitToApp />, name: "Logout", func: logoutUser }
    ];
    if (user.role === "admin") {
        options = [{ icon: <MdDashboard />, name: "Dashboard", func: dashboard }, ...options]
    }
    function orders() { Navigate('/orders') }
    function account() { Navigate('/account') }
    function dashboard() { Navigate('/dashboard') }
    function logoutUser() {
        dispatch(logout())
        Navigate('/login');
        toast.success("Logout Successfully!!")
    }
    return (
        <>
            <ToastContainer />
            <Backdrop open={open} style={{ zIndex: 10 }} />
            <SpeedDial
                ariaLabel='SpeedDail'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                className='speedDial'
                style={{ zIndex: 11 }}
                icon={<img className='speedDialIcon' src={user.avatar.url || profilePng} alt='Profile' />}
            >
                {options.map((item) =>
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
                )}
            </SpeedDial>
        </>
    )
}

export default UserOptions