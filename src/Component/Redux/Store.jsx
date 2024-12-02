import { configureStore } from "@reduxjs/toolkit"
import ProductApi from "./Product.jsx";
const store=configureStore({
    reducer:{
        product:ProductApi.reducer,
    }
})

export default store