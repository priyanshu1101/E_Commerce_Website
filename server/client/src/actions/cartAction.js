import { fetchProductDetails } from "../api/product"
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEMS_FAIL, UPDATE_CART_ITEMS_REQUEST, UPDATE_CART_ITEMS_SUCCESS } from "../constants/cartConstants";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await fetchProductDetails(id);
        dispatch({
            type: ADD_TO_CART, payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity
            }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log(error);
    }
}
export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART, payload: data })
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}

export const updateCart = (cartItems) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CART_ITEMS_REQUEST });
        var cart = [];
        var cartData = null;
        for (let i = 0; i < cartItems.length; i++) {
            try {
                const { data } = await fetchProductDetails(cartItems[i].product);
                cartData = data;
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    continue;
                } else {
                    throw error;
                }
            }
            cart.push({
                product: cartData.product._id,
                name: cartData.product.name,
                price: cartData.product.price,
                image: cartData.product.images[0].url,
                stock: cartData.product.Stock,
                quantity: (cartItems[i].quantity > cartData.product.Stock && cartData.product.Stock !== 0) ? cartData.product.Stock : cartItems[i].quantity,
            });
        }
        localStorage.setItem("cartItems", JSON.stringify(cart));
        dispatch({ type: UPDATE_CART_ITEMS_SUCCESS, payload: cart });
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEMS_FAIL, payload: error.response ? error.response.data.message : "Error occurred" });
    }
};
