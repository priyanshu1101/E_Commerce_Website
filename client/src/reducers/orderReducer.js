import { ADMIN_ALL_ORDERS_FAIL, ADMIN_ALL_ORDERS_REQUEST, ADMIN_ALL_ORDERS_SUCCESS, ADMIN_ORDER_DELETE_FAIL, ADMIN_ORDER_DELETE_REQUEST, ADMIN_ORDER_DELETE_RESET, ADMIN_ORDER_DELETE_SUCCESS, ADMIN_ORDER_UPDATE_FAIL, ADMIN_ORDER_UPDATE_REQUEST, ADMIN_ORDER_UPDATE_RESET, ADMIN_ORDER_UPDATE_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS } from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            };
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};


export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};
export const orderDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };
        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};


export const adminReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ALL_ORDERS_REQUEST:
        case ADMIN_ORDER_UPDATE_REQUEST:
        case ADMIN_ORDER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount,
            };

        case ADMIN_ORDER_DELETE_SUCCESS:
        case ADMIN_ORDER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success
            }
        case ADMIN_ALL_ORDERS_FAIL:
        case ADMIN_ORDER_UPDATE_FAIL:
        case ADMIN_ORDER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case ADMIN_ORDER_DELETE_RESET:
        case ADMIN_ORDER_UPDATE_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};