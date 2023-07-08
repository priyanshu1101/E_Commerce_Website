import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import axios from "axios";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';


const styles = {
    customAlert: {
        backgroundColor: '#f8f9fa',
        color: '#333',
        padding: '12px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: '15px'
    },
    customAlertContent: {
        display: 'flex',
        alignItems: 'center',
    },
    customAlertIcon: {
        fontSize: '20px',
        marginRight: '10px',
    },
    customAlertMessage: {
        fontSize: '16px',
    },
};

const CustomAlertTemplate = ({ message, options, close }) => (
    <div style={styles.customAlert}>
        <div style={styles.customAlertContent}>
            {options.type === 'success' && (
                <span style={styles.customAlertIcon}>✔️</span>
            )}
            {options.type === 'error' && (
                <span style={styles.customAlertIcon}>❌</span>
            )}
            <span style={styles.customAlertMessage}>{message}</span>
        </div>
    </div>
);

const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    transition: transitions.SCALE,
};

axios.defaults.withCredentials = true;

const store = configureStore({ reducer: reducers }, {}, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <AlertProvider template={CustomAlertTemplate} {...options}>
            <App />
        </AlertProvider>
    </Provider>,
);