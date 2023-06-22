import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const store = configureStore({ reducer: reducers }, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);