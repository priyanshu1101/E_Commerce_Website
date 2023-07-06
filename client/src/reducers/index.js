import { combineReducers } from "redux";
import { productReducer as products, productDetailsReducer as productDetails, newReviewReducer as newReview, productFunctionReducer as productFunctions } from "./productReducer";
import { userReducer as user, profileReducer as profile, forgotPasswordReducer as forgotPassword } from "./userReducer";
import { cartReducer as cart } from "./cartReducer";
import { newOrderReducer as newOrder, myOrdersReducer as myOrders, orderDetailReducer as orderDetails } from "./orderReducer";
export default combineReducers({
    products,
    productDetails,
    user,
    profile,
    forgotPassword,
    cart,
    newOrder,
    myOrders,
    orderDetails,
    newReview,
    productFunctions
});