import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import { Typography } from '@mui/material';
import './Dashboard.css'
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsForAdmin } from '../../../../actions/productAction';
import { fetchAllOrdersForAdmin } from '../../../../actions/orderAction';
import { fetchUsers } from '../../../../actions/userAction';
import { CLEAR_ERRORS } from '../../../../constants/userConstants';
import { useAlert } from 'react-alert';
import MetaData from '../../../../MetaData';
Chart.register(CategoryScale);


const Dashboard = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { products } = useSelector(state => state.products);
  const { orders, totalAmount } = useSelector(state => state.orderFunctionsForAdmin);
  const { users, error } = useSelector(state => state.userFunctionForAdmin)

  var outofstock = 0;

  products && products.forEach(product => {
    if (product.Stock < 1)
      outofstock++;
  })

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
    dispatch(getProductsForAdmin());
    dispatch(fetchAllOrdersForAdmin());
    dispatch(fetchUsers())
  }, [dispatch, error, alert])

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"], // Make sure these are categorical labels
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      }
    ]
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outofstock, products.length - outofstock]
      }
    ],
  }
  return (
    <div className='dashboard'>
      <Sidebar />
      <MetaData title="Admin Dashboard" />
      <div className='dashboardContainer'>
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount: <br /> Rs. {totalAmount && totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <div className='dashboardSummaryBox2'>
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className='lineChart'>
          <Line
            data={lineState}
          />
        </div>
        <div className='doughnutChart'>
          <Doughnut
            data={doughnutState}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 