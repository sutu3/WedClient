import { configureStore } from "@reduxjs/toolkit"
import ProductApi from "./Product.jsx";
import AuthenticationSlice from "./AuthenticationSlice.jsx";
import UserSlice from "./UserSlice.jsx";
import OrderApi from "./OrderSlice.jsx";
import OrderItemApi from "./OrderItemSlice.jsx";
const store=configureStore({
    reducer:{
        product:ProductApi.reducer,
        authentication:AuthenticationSlice.reducer,
        user:UserSlice.reducer,
        order:OrderApi.reducer,
        orderitem:OrderItemApi.reducer
    }
})

export default store