import { fetchProductDetails } from "../api/product"
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

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
    try {
        dispatch({ type: REMOVE_FROM_CART, payload: id })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log(error);
    }
}