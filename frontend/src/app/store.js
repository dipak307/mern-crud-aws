import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import chatReducer from "../features/chat/chatSlice";

 const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
    chat: chatReducer,
  },
});
export default store;
