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
import './App.css';

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
        <Route exact path='/products' Component={Products} />
        <Route exact path='/products/:keyword' Component={Products} />
        <Route exact path='/search' Component={Search} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
