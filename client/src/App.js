import React from 'react'
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
import Products from './component/Products/Products List/Products';
import ItemCart from './component/Products/ItemCart.js/ItemCart';
import './App.css';

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user)
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', "Droid Sans", "Chilanka"]
      }
    })
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' Component={Home} />

        {/* Product Detail */}
        <Route exact path='/product/:id' Component={productDetails} />
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
        <Route exact path='/account/updatePassword/:token' Component={UpdatePassword} />

        {/* Item Cart */}
        <Route exact path='/cart' Component={ItemCart} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
