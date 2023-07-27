import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/layout/Header/Header';
import webfont from "webfontloader"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import productDetails from "./component/ProductDetails/ProductDetails.js";
import ScrollToTop from './component/ScrollToTop';
import Search from './component/Search/Search';
import LoginSignUp from './component/User/LoginForm/LoginSignUp';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions/UserOptions.js';
import Profile from './component/User/Profile/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword/UpdatePassword';
import Products from './component/Products/Products/Products';
import ItemCart from './component/Products/ItemCart/ItemCart';
import ConfirmOrder from './component/Products/ConfirmOrder/ConfirmOrder';
import ShippingPage from './component/Products/ShippingInfo/ShippingPage';
import PaymentGateway from './component/Products/PaymentGateway/PaymentGateway';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import SuccessPage from './component/Products/PaymentGateway/SuccessPage/SuccessPage';
import MyOrders from './component/User/MyOrders/MyOrders';
import OrderDetail from './component/User/MyOrders/OrderDetail/OrderDetail';
import Dashboard from './component/User/Admin/Dashboard/Dashboard';
import AdminRoute from './component/Route/AdminRoute';
import ProductList from './component/User/Admin/ProductList/ProductList';
import NewProduct from './component/User/Admin/NewProduct/NewProduct';
import OrderList from './component/User/Admin/OrderList/OrderList';
import ProcessOrder from './component/User/Admin/Process Order/ProcessOrder';
import UserList from './component/User/Admin/Users List/UserList';
import UpdateUser from './component/User/Admin/Update User/UpdateUser';
import ReviewList from './component/User/Admin/ReviewList/ReviewList';
import About from './component/layout/About/About';
import Contact from './component/layout/Contact Us/Contact';
import './App.css';
import PageNotFound from './component/layout/Not Found/PageNotFound';

export const App = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const getApiKey = async () => {
    try {
      const { data } = await axios.get('/payment/getStripeApiKey')
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
    }
  }
  const userVisit = async () => {
    try {
      await axios.post("/user/visited");
    } catch (error) {
    }
  }
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', "Droid Sans", "Chilanka"]
      }
    })
    getApiKey();
    userVisit();
    dispatch(loadUser());
  }, [dispatch]);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path='/' Component={Home} />

        {/* Product Detail */}
        <Route exact path='products/product/:id' Component={productDetails} />
        {/* <Route exact path='/products/product/:id' Component={productDetails} /> */}

        {/*Product  */}
        <Route exact path='/products' Component={Products} />
        <Route exact path='/products/:keyword' Component={Products} />

        {/* Search Product */}
        <Route exact path='/search' Component={Search} />

        {/* Login */}
        <Route exact path='/login' Component={LoginSignUp} />

        {/* Profile */}
        <Route exact path='/account' Component={ProtectedRoute}>
          <Route exact path='/account' Component={Profile} />
        </Route>

        {/* Update Profile */}
        <Route exact path='/account/update' Component={ProtectedRoute}>
          <Route exact path='/account/update' Component={UpdateProfile} />
        </Route>

        {/* Update Password */}
        <Route exact path='/account/updatePassword' Component={ProtectedRoute}>
          <Route exact path='/account/updatePassword' Component={UpdatePassword} />
        </Route>

        {/* Reset Password */}
        <Route exact path='/user/password/reset/:token' Component={UpdatePassword} />

        {/* Item Cart */}
        <Route exact path='/cart' Component={ItemCart} />

        {/* About Paeg */}
        <Route exact path='/about' Component={About} />

        {/* Contact Page */}
        <Route exact path='/contact' Component={Contact} />

        {/* Shipping Info */}
        <Route exact path='/shipping' Component={ProtectedRoute}>
          <Route exact path='/shipping' Component={ShippingPage} />
        </Route>

        {/* Confirm Order */}
        <Route exact path='/order/confirm' Component={ProtectedRoute}>
          <Route exact path='/order/confirm' Component={ConfirmOrder} />
        </Route>

        {/*  PAyment Gateway */}

        <Route exact path='/order/payment' Component={ProtectedRoute} >
          {stripeApiKey &&
            <Route exact path='/order/payment' element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PaymentGateway />
              </Elements>}
            />}
        </Route >

        {/* Success Page */}
        <Route exact path='/success' Component={ProtectedRoute}>
          <Route exact path='/success' Component={SuccessPage} />
        </Route>

        {/* My Orders Page */}
        <Route exact path='/myorders' Component={ProtectedRoute}>
          <Route exact path='/myorders' Component={MyOrders} />
        </Route>

        {/* Order Detail */}
        <Route exact path='/order/:id' Component={ProtectedRoute}>
          <Route exact path='/order/:id' Component={OrderDetail} />
        </Route>

        {/* Admin Dashboard */}
        <Route exact path='/admin/dashboard' Component={AdminRoute}>
          <Route exact path='/admin/dashboard' Component={Dashboard} />
        </Route>

        {/* Admin Product List */}
        <Route exact path='/admin/products' Component={AdminRoute}>
          <Route exact path='/admin/products' Component={ProductList} />
        </Route>

        {/* Admin Add Product */}
        <Route exact path='/admin/product/new' Component={AdminRoute}>
          <Route exact path='/admin/product/new' Component={NewProduct} />
        </Route>

        {/* Admin update Product */}
        <Route exact path='/admin/product/update/:id' Component={AdminRoute}>
          <Route exact path='/admin/product/update/:id' Component={NewProduct} />
        </Route>

        {/* Admin Order List */}
        <Route exact path='/admin/orders' Component={AdminRoute}>
          <Route exact path='/admin/orders' Component={OrderList} />
        </Route>

        {/* Admin Process Order */}
        <Route exact path='/admin/order/update/:id' Component={AdminRoute}>
          <Route exact path='/admin/order/update/:id' Component={ProcessOrder} />
        </Route>

        {/* Admin User List */}
        <Route exact path='/admin/users' Component={AdminRoute}>
          <Route exact path='/admin/users' Component={UserList} />
        </Route>

        {/* Admin User List */}
        <Route exact path='/admin/user/update/:id' Component={AdminRoute}>
          <Route exact path='/admin/user/update/:id' Component={UpdateUser} />
        </Route>

        {/* Admin User List */}
        <Route exact path='/admin/reviews' Component={AdminRoute}>
          <Route exact path='/admin/reviews' Component={ReviewList} />
        </Route>


        <Route path='/*' Component={window.location.pathname === "/order/payment" ? null : PageNotFound} />
      </Routes>
      <Footer />
    </BrowserRouter >
  )
}
