import React, { useState } from 'react';
import './UserOptions.css';
import { SpeedDial, SpeedDialAction, Backdrop, Badge } from '@mui/material';
import { GiShoppingCart } from 'react-icons/gi';
import { MdDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdExitToApp } from 'react-icons/md';
import { FaListAlt } from 'react-icons/fa';
import profilePng from '../../../../images/Profile.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../../actions/userAction';

const style = {
    badge: {
        top: '-1px', // Adjust the vertical position as needed
        right: '-10px', // Adjust the horizontal position as needed
        fontSize: '10px', // Adjust the font size as needed
    }
}

const UserOptions = ({ user }) => {
    const { error } = useSelector((state) => state.user);
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const alert = useAlert();
    const [open, setOpen] = useState(false);

    var options = [
        { icon: <FaListAlt size={20} />, name: 'Orders', func: orders },
        { icon: <BsFillPersonFill size={23} />, name: 'Profile', func: account },
        {
            icon: (cartItems.length === 0) ?
                <GiShoppingCart size={27} />
                :
                <Badge badgeContent={<span style={style.badge}>{cartItems.length}</span>} color="secondary">
                    <GiShoppingCart size={27} />
                </Badge>,
            name: 'Cart', func: cart
        },
        { icon: <MdExitToApp size={23} />, name: 'Logout', func: logoutUser },
    ];
    if (user?.role === 'admin') {
        options = [{ icon: <MdDashboard size={23} />, name: 'Dashboard', func: dashboard }, ...options];
    }

    function orders() {
        Navigate('/myorders');
    }

    function cart() {
        Navigate('/cart');
    }

    function account() {
        Navigate('/account');
    }

    function dashboard() {
        Navigate('/admin/dashboard');
    }

    async function logoutUser() {
        if (user) {
            await dispatch(logout());
            if (!error) {
                alert.success('Logout Successfully!!');
            }
        }
        Navigate('/login');
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: 10 }} />
            <SpeedDial
                ariaLabel="SpeedDail"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                style={{ zIndex: 11 }}
                icon={<img className="speedDialIcon" src={user?.avatar.url || profilePng} alt="Profile" />}
            >
                {options.map((item) => (
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600} />
                ))}
            </SpeedDial>
        </>
    );
};

export default UserOptions;
