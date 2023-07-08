import { ADD_TO_CART, CLEAR_CART, CLEAR_ERRORS, REMOVE_FROM_CART, SAVE_SHIPPING_INFO, UPDATE_CART_ITEMS_FAIL, UPDATE_CART_ITEMS_REQUEST, UPDATE_CART_ITEMS_SUCCESS } from "../constants/cartConstants";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const item = action.payload;
            const isItemExist = state.cartItems ? state.cartItems.find((i) => i.product === item.product) : false;
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.product === item.product ? item : i)
                }
            }
            else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== action.payload)
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            };
        case UPDATE_CART_ITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_CART_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload
            }
        case UPDATE_CART_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_CART:
            {
                return {
                    ...state,
                    cartItems: []
                }
            }
        case CLEAR_ERRORS:
            {
                return {
                    ...state,
                    error: null
                }
            }
        default:
            return state;
    }
};