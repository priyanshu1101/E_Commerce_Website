import { combineReducers } from "redux";
import { productReducer as products, productDetailsReducer as productDetails } from "./productReducer";
import { userReducer as user, profileReducer as profile, forgotPasswordReducer as forgotPassword } from "./userReducer";
import { cartReducer as cart } from "./cartReducer";
export default combineReducers({
    products,
    productDetails,
    user,
    profile,
    forgotPassword,
    cart
});