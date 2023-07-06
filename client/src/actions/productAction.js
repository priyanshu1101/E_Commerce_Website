import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from '../constants/productConstants';
import { fetchProducts, fetchProductDetails, reviewProductAPI, fetchProductsForAdminAPI, createProductByAdminAPI, deleteProductByAdminAPI, updateProductByAdminAPI } from '../api/product';

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

export const productReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await reviewProductAPI(reviewData, config);
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}


//  Admin

export const getProductsForAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST })

        const { data } = await fetchProductsForAdminAPI();
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST })
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await createProductByAdminAPI(productData, config);
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteProduct = (productID) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })
        const { data } = await deleteProductByAdminAPI(productID);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProduct = (productId, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await updateProductByAdminAPI(productId, productData, config);
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}