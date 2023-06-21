import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants';
import { fetchProducts, fetchProductDetails } from '../api/product';

export const getProducts = (keyword = "", currentPage = 1, price = [0, 1000000], category = "", rating = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        let parameters = `keyword=${keyword}&page=${currentPage}`;
        parameters = parameters + ((price[1] !== 1000000) ? `&price[gte]=${price[0]}&price[lte]=${price[1]}` : ``);
        parameters = parameters + ((category !== "") ? `&category=${category}` : ``);
        parameters = parameters + ((rating !== "") ? `&ratings[gte]=${rating}` : ``);

        const { data } = await fetchProducts(parameters);
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