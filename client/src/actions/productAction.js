import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants';
import { fetchProducts, fetchProductDetails } from '../api/product';

export const getProducts = (keyword = "", currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        const { data } = await fetchProducts(keyword, currentPage);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getProductDetails = (productID) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await fetchProductDetails(productID);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}