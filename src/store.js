import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartSlice from "./Slices/cartSlice";

import productSlice from "./Slices/productSlice";
import userSlice from "./Slices/userSlice.js";
import OrderSlice from "./Slices/OrderSlice.js";
import favouriteSlice from "./Slices/favouriteSlice.js";
import allusersDataSlice from './Slices/adminSlice.js'
import merchantSlice from "./Slices/merchantSlice.js";

const reducer = combineReducers({
  product: productSlice,
  cart: cartSlice,
  order:OrderSlice,
  user: userSlice,
  favourite: favouriteSlice,
  usersData : allusersDataSlice,
  merchant : merchantSlice,
});

const middleware = [thunk];

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : {};

const initialState = {
  // cart: {
  //   cartList: { cartItems: [] },
  //   shippingAddress: shippingAddressFromStorage,
  // },
  // userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
