import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import  {toasityComponent,StatusEnum} from "../Toasity/ToasityComponent.jsx"
const local = https + "/orderitems";
const initialState = {
    Order: {},
    loading: false,
    error: null,
};
const OrderItemApi = createSlice({
  name: "orderitem",
    initialState,
  reducers: {
    /*ChangeIntrospect: (state) => {
      state.Introspect=true;
      localStorage.setItem('token', JSON.stringify(true));
    },*/
  },
  extraReducers: (builder) => {
    builder



  }
});

export const PostOrderItem = createAsyncThunk(
  "orderitem/PostOrderItem",
    async (data1) => {
        try {
            const res = await fetch(`${local}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data1.token}`,
                },
                method: "POST",
                body: JSON.stringify(data1.data),
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
)
export default OrderItemApi;
