import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import  {toasityComponent,StatusEnum} from "../Toasity/ToasityComponent.jsx"
const local = https + "/product";

const initialState = {
    Product: localStorage.getItem("product")
        ? JSON.parse(localStorage.getItem("product"))
        : [],
    loading: false,
    error: null,
};
const ProductApi = createSlice({
  name: "product",
    initialState,
  reducers: {
    /*ChangeIntrospect: (state) => {
      state.Introspect=true;
      localStorage.setItem('token', JSON.stringify(true));
    },*/
  },
  extraReducers: (builder) => {
    builder
        .addCase(GetProduct.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Product=result.result;
                localStorage.setItem('product', JSON.stringify(result.result));
            }
        })


  }
});

export const GetProduct = createAsyncThunk(
  "product/GetProduct",
    async () => {
        try {
            const res = await fetch(`${local}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            return data;
        } catch (error) {
            toasityComponent(
                `Có lỗi xảy ra:  ${Error.mesage}`,
                StatusEnum.ERROR,
            );
        }
    }
);
export const FetchInfom = () => {
    return async function check(dispatch, getState) {

        await dispatch(GetProduct());
    };
};
export default ProductApi;
