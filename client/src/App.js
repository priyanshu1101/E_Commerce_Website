import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/layout/Header/Header';
import webfont from "webfontloader"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
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
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
