import { createOrderAPI, getMyOrderAPI, getOrderDetailsAPI } from "../api/order";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS } from "../constants/orderConstants";

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