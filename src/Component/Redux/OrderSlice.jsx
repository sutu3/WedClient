import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import  {toasityComponent,StatusEnum} from "../Toasity/ToasityComponent.jsx"
const local = https + "/orders";
const initialState = {
    Order: {},
    loading: false,
    error: null,
};
const OrderApi = createSlice({
  name: "order",
    initialState,
  reducers: {
    ChangeOrder: (state,action) => {
        state.Order=action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(PostOrder.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Order=result.result;
            }
            else{
                toasityComponent("cause: "+result.message,StatusEnum.ERROR)
            }
        })


  }
});

export const PostOrder = createAsyncThunk(
  "order/PostOrder",
    async (data1) => {
        try {
            const res = await fetch(`${local}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data1.token}`,
                },
                method: "POST",
                body:JSON.stringify(data1.data)
            });
            const data = await res.json();
            return data;
        } catch (error) {
            toasityComponent(
                `Có lỗi xảy ra:  ${Error.message}`,
                StatusEnum.ERROR,
            );
        }
    }
);
export default OrderApi;
