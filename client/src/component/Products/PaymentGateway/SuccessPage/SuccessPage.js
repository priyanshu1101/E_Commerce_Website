import { Typography } from '@mui/material'
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './SuccessPage.css'
const SuccessPage = () => {
    return (
        <div className='orderSuccess'>
            <BsFillCheckCircleFill />
            <Typography>Your Order has been placed successfully !!</Typography>
            <Link to="/myorders">View Orders</Link>
        </div>
    )
}

export default SuccessPage