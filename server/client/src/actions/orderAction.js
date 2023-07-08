import { createOrderAPI, deleteOrderAPI, fetchAllOrdersForAdminAPI, getMyOrderAPI, getOrderDetailsAPI, updateOrderAPI } from "../api/order";
import { ADMIN_ALL_ORDERS_FAIL, ADMIN_ALL_ORDERS_REQUEST, ADMIN_ALL_ORDERS_SUCCESS, ADMIN_ORDER_DELETE_FAIL, ADMIN_ORDER_DELETE_REQUEST, ADMIN_ORDER_DELETE_SUCCESS, ADMIN_ORDER_UPDATE_FAIL, ADMIN_ORDER_UPDATE_REQUEST, ADMIN_ORDER_UPDATE_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS } from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await createOrderAPI(order, config);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST })

        const { data } = await getMyOrderAPI();
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// My Orders
export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST })

        const { data } = await getOrderDetailsAPI(id);
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

// Admin

// Get Admin Orders
export const fetchAllOrdersForAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ALL_ORDERS_REQUEST })

        const { data } = await fetchAllOrdersForAdminAPI();
        dispatch({
            type: ADMIN_ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Orders -- Admin
export const updateOrder = (orderId, orderData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_UPDATE_REQUEST })
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await updateOrderAPI(orderId, orderData, config);
        dispatch({
            type: ADMIN_ORDER_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}
// Update Orders -- Admin
export const deleteOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_DELETE_REQUEST })
        const { data } = await deleteOrderAPI(orderId);
        dispatch({
            type: ADMIN_ORDER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}