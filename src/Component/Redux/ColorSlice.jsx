import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import  {toasityComponent,StatusEnum} from "../Toasity/ToasityComponent.jsx"
const local = https + "/colors";
const initialState = {
    Color: [],
    loading: false,
    error: null,
};
const ColorApi = createSlice({
  name: "color",
    initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
        .addCase(GetColors.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Color=result.result;
            }
            else{
                toasityComponent("cause: "+result.message,StatusEnum.ERROR)
            }
        })


  }
});

export const GetColors = createAsyncThunk(
  "color/GetColors",
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
export default ColorApi;
