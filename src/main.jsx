import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Component/Redux/Store.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Component/Home/index.jsx";
import ProductsDetails from "./Component/Home/ProductsDetails.jsx";
import Cart from './Component/Cart/index'
/*import Home from './Component/Home/index'
import Cart from './Component/Cart/index'
import User from './Component/User/index'
import Gender from './Component/Genderpage/index.jsx'
import  Order  from "./Component/Order/index.jsx";
import HomeOrder from "./Component/Order/Home.jsx";
import Address from './Component/Address/index.jsx'*/
ReactDOM.createRoot(document.getElementById("root")).render(
    <NextUIProvider>
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/detail/:id' element={<ProductsDetails/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            {/*<Route path="/infor" element={<User/>}/>
                            <Route path="gender" element={<Gender/>}/>
                            <Route path="address" element={<Address/>}/>
                            <Route path="order" element={<Order/>}>
                                <Route path="home" element={<HomeOrder/>}/>
                            </Route>*/}
                        </Route>
                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </BrowserRouter>
            </React.StrictMode>
            ,
        </Provider>
    </NextUIProvider>
);
