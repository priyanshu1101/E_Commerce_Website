import React from 'react'
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FaShippingFast } from 'react-icons/fa';
import { BsCheckSquare } from 'react-icons/bs';
import { AiOutlineBank } from 'react-icons/ai';
import './CheckoutSteps.css';

const stepStyles = {
    boxSizing: 'border-box'
}

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <FaShippingFast size={25} />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <BsCheckSquare size={22} />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AiOutlineBank size={25} />
        },
    ]
    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index} completed={activeStep >= index}>
                        <StepLabel style={{ color: (activeStep >= index) ? "tomato" : "rgba(0,0,0,0.649)" }} icon={item.icon}>{item.label}</StepLabel>
                    </Step>
                ))}
            </Stepper >
        </>
    )
}

export default CheckoutSteps