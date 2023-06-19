import { combineReducers } from "redux";
import { productReducer as products, productDetailsReducer as productDetails } from "./productReducer";
export default combineReducers({
    products,
    productDetails
});