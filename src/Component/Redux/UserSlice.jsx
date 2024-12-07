import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import Authentication, { GetToken } from "./AuthenticationSlice.jsx";
import {StatusEnum, toasityComponent} from "../Toasity/ToasityComponent.jsx";
import OrderApi, {PostOrder} from "./OrderSlice.jsx";
import {PostOrderItem} from "./OrderItemSlice.jsx";
// Constants
const local = https + "/users";

// Types


// Initial state
const initialState = {
    Infor: "",
    user:{},
loading: false,
    error: null
};

// Async Thunks
export const Getmyinfor = createAsyncThunk(
    "user/Getmyinfor",
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(`${local}/myinfor`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            toasityComponent(
                `Có lỗi xảy ra:  ${error.mesage}`,
                StatusEnum.ERROR,
            );
        }
    }
);

// Slice
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.Infor = "";
            state.token = null;
            localStorage.removeItem('tokenuser');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Getmyinfor.fulfilled, (state, action) => {
                const result=action.payload;
                state.user=result.result;
                localStorage.setItem("user",JSON.stringify(state.user))
            });
    },
});

// Thunk action creator
export const SignIn = (data) => { // Replace 'any' with proper type
    return async function (dispatch, getState) {
        try {
            console.log(data)
            await dispatch(GetToken(data));
            const token = getState().authentication.token;
            if (!token) {
                throw new Error('Authentication failed');
            }
            await dispatch(Getmyinfor(token));
            dispatch(Authentication.actions.ChangeIntrospect);
            if(orders.find((el)=>el.status=="PENDING"))
            {
                dispatch(OrderApi.actions.ChangeOrder(orders.find((el)=>el.status=="PENDING")||{}));
            }
        } catch (error) {
            toasityComponent('SignUp process failed: '+error ,StatusEnum.ERROR)
            // You might want to dispatch an error action here
        }
    };
};
export const AddtoCard = (data) => { // Replace 'any' with proper type
    return async function (dispatch, getState) {
        try {
            const user = getState().user.user;
            const orders=user.orders;
            const token = getState().authentication.token;
            if(!orders.find((el)=>el.status=="PENDING"))
            {
                await dispatch(PostOrder({data: {userid: user.id},token:token}));
            }else{
                dispatch(OrderApi.actions.ChangeOrder(orders.find((el)=>el.status=="PENDING")));
            }
            const order=getState().order.Order;
            const orderitem=await dispatch(PostOrderItem({data:{
                 productname:data.productname,
                 colorname:data.colorname,
                 sizename:data.sizename,
                 orderid:order.idorder,
                 quantity:data.quantity,
                 price_at_sale :data.price_at_sale
            },token:token}))
            order.orderitems.push(orderitem.payload.result);
            dispatch(OrderApi.actions.ChangeOrder(order))
        } catch (error) {
            toasityComponent('SignUp process failed: '+ error,StatusEnum.ERROR);
            // You might want to dispatch an error action here
        }
    };
};

// Export actions and reducer
export const { clearUserData } = UserSlice;
export default UserSlice;