import { CLEAR_ERRORS } from "../constants/productConstants";
import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_RESET, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_RESET, ADMIN_USER_FETCH_SUCCESS, ADMIN_USER_FETCH_FAIL, ADMIN_USER_FETCH_REQUEST, ADMIN_USERDETAILS_FETCH_FAIL, ADMIN_USERDETAILS_FETCH_REQUEST, ADMIN_USERDETAILS_FETCH_SUCCESS, ADMIN_USER_UPDATE_REQUEST, ADMIN_USER_DELETE_REQUEST, ADMIN_USER_UPDATE_SUCCESS, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_UPDATE_FAIL, ADMIN_USER_DELETE_FAIL, ADMIN_USER_UPDATE_RESET, ADMIN_USER_DELETE_RESET } from "../constants/userConstants";
export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case LOGOUT_SUCCESS:
            {
                return {
                    loading: false,
                    isAuthenticated: false,
                    user: null
                }
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
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

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            }
        case FORGOT_PASSWORD_RESET:
        case RESET_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                message: null,
                success: false
            };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
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

export const adminUserFunctionReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_USER_FETCH_REQUEST:
        case ADMIN_USERDETAILS_FETCH_REQUEST:
        case ADMIN_USER_UPDATE_REQUEST:
        case ADMIN_USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_USER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case ADMIN_USERDETAILS_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case ADMIN_USER_UPDATE_SUCCESS:
        case ADMIN_USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case ADMIN_USER_FETCH_FAIL:
        case ADMIN_USERDETAILS_FETCH_FAIL:
        case ADMIN_USER_UPDATE_FAIL:
        case ADMIN_USER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_USER_UPDATE_RESET:
        case ADMIN_USER_DELETE_RESET:
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