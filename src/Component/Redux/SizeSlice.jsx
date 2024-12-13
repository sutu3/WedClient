import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import  {toasityComponent,StatusEnum} from "../Toasity/ToasityComponent.jsx"
const local = https + "/sizes";
const initialState = {
    Size: [],
    loading: false,
    error: null,
};
const SizeApi = createSlice({
  name: "size",
    initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
        .addCase(GetSizes.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Size=result.result;
            }
            else{
                toasityComponent("cause: "+result.message,StatusEnum.ERROR)
            }
        })


  }
});

export const GetSizes = createAsyncThunk(
  "size/GetSizes",
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
                `Có lỗi xảy ra:  ${Error.message}`,
                StatusEnum.ERROR,
            );
        }
    }
);
export default SizeApi;
