import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_FAIL, LOAD_USER_SUCCESS, LOAD_USER_REQUEST, LOGOUT_REQUEST, LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "../constants/userConstants";
import { googleAuthUser, loginUser, registerUser, loadUserApi, logoutUser, updateUserProfileApi, updatePasswordApi, forgotPasswordAPI, resetPasswordAPI } from "../api/user";
import Cookies from 'js-cookie';

// Login
export const login = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await loginUser(userData, config);
        Cookies.set('token', data.token, { expires: Number(data.expiresIn) });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}
//  Login through goodle
export const googleAuth = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await googleAuthUser(userData, config);
        Cookies.set('token', data.token, { expires: Number(data.expiresIn) })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}
// Register new user
export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await registerUser(formData, config);
        Cookies.set('token', data.token, { expires: Number(data.expiresIn) })
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const { data } = await loadUserApi();
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST })
        Cookies.remove('token');
        await logoutUser();
        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}
// Update Profile
export const updateUserProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await updateUserProfileApi(userData, config);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}
// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await updatePasswordApi(passwords, config);
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const forgotPassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await forgotPasswordAPI(userData, config);
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}
export const resetPassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await resetPasswordAPI(userData, config);
        Cookies.set('token', data.token, { expires: Number(data.expiresIn) })
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}