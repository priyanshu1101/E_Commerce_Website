import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import axios from "axios";


// axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
axios.defaults.baseURL = `https://e-commerce-website-server.onrender.com`;

const store = configureStore({ reducer: reducers }, {}, compose(applyMiddleware(thunk)));

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>);
