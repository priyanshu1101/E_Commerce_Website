import { Typography } from '@mui/material'
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './SuccessPage.css'
const SuccessPage = () => {
    return (
        <div style={{ minHeight: '100vh' }}>
            <div className='orderSuccess'>
                <BsFillCheckCircleFill />
                <Typography>Your Order has been placed successfully !!</Typography>
                <Link to="/myorders">View Orders</Link>
            </div>
        </div>
    )
}

export default SuccessPage