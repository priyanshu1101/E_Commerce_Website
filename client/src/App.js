import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/layout/Header/Header';
import webfont from "webfontloader"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import productDetails from "./component/Product/ProductDetails.js";
import './App.css';
import ScrollToTop from './component/ScrollToTop';

export const App = () => {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', "Droid Sans", "Chilanka"]
      }
    })
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/product/:id' Component={productDetails} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
