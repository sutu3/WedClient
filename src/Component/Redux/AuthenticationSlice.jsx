import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import {StatusEnum, toasityComponent} from "../Toasity/ToasityComponent.jsx";
const local = https + "/authentication";
const initialState = {
    token: localStorage.getItem("tokenuser")
        ? JSON.parse(localStorage.getItem("tokenuser"))
        : [],
    Introspect:localStorage.getItem("Introspect") ?localStorage.getItem("Introspect"):false,
    loading: false,
    error: null,
};
const AuthenticationApi = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        ChangeIntrospect: (state) => {
          state.Introspect=true;
          localStorage.setItem('token', JSON.stringify(true));
        },
    },
    extraReducers: (builder) => {
        builder
            // GetToken cases
            .addCase(GetToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(GetToken.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    state.token = action.payload.result.token;
                    console.log(state.token)
                    localStorage.setItem('tokenuser', JSON.stringify(action.payload.result.token));
                }
            })
            ;



    }
});
export const GetToken = createAsyncThunk(
    "authentication/GetToken",
    async (payload, { rejectWithValue }) => {
        console.log("Sending request to server...");
        const res = await fetch(`${local}/token`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username: payload.username,
                password: payload.password,
            }),
        });

        console.log("Response status:", res.status);
        if (!res.ok) {
            const errorData = await res.json();
            console.error("Error from server:", errorData);
            toasityComponent(
                `Có lỗi xảy ra:  ${errorData.message}`,
                StatusEnum.ERROR,
            );
        }

        const data = await res.json();
        console.log("Response data:", data);
        return data;
    }
);

export const Introspect = createAsyncThunk(
    "authentication/Introspect",
    async (payload, { rejectWithValue }) => {
        const res = await fetch(`${local}/introspect`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                token: JSON.parse(localStorage.getItem('tokenuser')),
            }),
        });

        const data = await res.json();
        return data; // Thay `data` với token hoặc các thông tin cần thiết từ phản hồi
    }
);
export const RefreshToken = createAsyncThunk(
    "authentication/RefreshToken",
    async (payload, { rejectWithValue }) => {
        const res = await fetch(`${local}/refresh`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                token: JSON.parse(localStorage.getItem('tokenuser')),
            }),
        });

        const data = await res.json();
        return data; // Thay `data` với token hoặc các thông tin cần thiết từ phản hồi
    }
);
export const IntrospectAndRefresh = () => {
    return async function check(dispatch, getState) {
        if(localStorage.getItem('tokenuser'))
        {
            await dispatch(Introspect());
            const updateState = getState();
            if(!updateState.authentication.Introspect)
            {
                await dispatch(RefreshToken());
            }
        }
    };
};

export default AuthenticationApi;
