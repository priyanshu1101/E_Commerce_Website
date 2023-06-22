import { combineReducers } from "redux";
import { productReducer as products, productDetailsReducer as productDetails } from "./productReducer";
import { userReducer as user} from "./userReducer";
export default combineReducers({
    products,
    productDetails,
    user
});