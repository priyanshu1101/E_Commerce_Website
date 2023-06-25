import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/layout/Header/Header';
import webfont from "webfontloader"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import productDetails from "./component/ProductDetails/ProductDetails.js";
import ScrollToTop from './component/ScrollToTop';
import Products from './component/Products/Products';
import Search from './component/Search/Search';
import LoginSignUp from './component/User/LoginForm/LoginSignUp';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions/UserOptions.js';
import './App.css';
import Profile from './component/User/Profile/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';

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

        <Route exact path='/product/:id' Component={productDetails} />
        {/* <Route exact path='/products/product/:id' Component={productDetails} /> */}

        <Route exact path='/products' Component={Products} />
        <Route exact path='/products/:keyword' Component={Products} />

        <Route exact path='/search' Component={Search} />

        <Route exact path='/login' Component={LoginSignUp} />

        <Route exact path='/account' Component={ProtectedRoute}>
          <Route exact path='/account' Component={Profile} />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
