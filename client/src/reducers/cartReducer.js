import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
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
                cartItems: state.cartItems.filter((item) => item.product !== action.payload)
            };
        default:
            return state;
    }
};