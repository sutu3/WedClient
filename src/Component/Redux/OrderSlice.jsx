import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "./Https";
import  {toasityComponent,StatusEnum} from "../Toasity/ToasityComponent.jsx"
import {GetColors} from "./ColorSlice.jsx";
import {GetSizes} from "./SizeSlice.jsx";
import {GetProduct} from "./Product.jsx";
import UserSlice from "./UserSlice.jsx";
import {PutInventory} from "./InventorySlice.jsx";
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
      ChangeItem: (state,action) => {
          state.Order = {
              ...state.Order,
              orderitems: [...(state.Order.orderitems || []), action.payload]
          };
      }
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
        .addCase(ChangeItemQuanlity.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Order.orderitems=state.Order.orderitems.map((el)=>el.idorderitem==result.result.idorderitem?result.result:el);
            }
            else{
                toasityComponent("cause: "+result.message,StatusEnum.ERROR)
            }
        })
        .addCase(DeleteItemOrder.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Order.orderitems=state.Order.orderitems.filter((el)=>el.idorderitem!=result.result);
            }
            else{
                toasityComponent("cause: "+result.message,StatusEnum.ERROR)
            }
        })
        .addCase(PutOrderItem.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Order.orderitems=state.Order.orderitems.map((el)=>el.idorderitem==result.result.idorderitem?result.result:el);
            }
            else{
                toasityComponent("cause: "+result.message,StatusEnum.ERROR)
            }
        })
        .addCase(PutOrder.fulfilled,(state,action)=>{
            const result=action.payload;
            if(result.success)
            {
                state.Order=[];
            }
            else{
                toasityComponent("cause: "+result.message,StatusEnum.ERROR)
            }
        })

  }
});
export const ChangeItemQuanlity = createAsyncThunk(
    "order/ChangeItemQuanlity",
    async ({token,id,data1}, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/orderitems/change/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PUT",
                body:JSON.stringify(data1)
            });

            if (!response.ok) {
                throw new Error('Failed to change quantity');
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
)
export const PutOrder = createAsyncThunk(
    "order/PutOrder",
    async ({token,id,data1}, { rejectWithValue }) => {
        try {
            const response = await fetch(`${local}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PUT",
                body:JSON.stringify(data1)
            });

            if (!response.ok) {
                throw new Error('Failed to change order');
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
export const PutOrderItem = createAsyncThunk(
    "order/PutOrderItem",
    async ({token,id,data1}, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/orderitems/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "PUT",
                body:JSON.stringify(data1)
            });

            if (!response.ok) {
                throw new Error('Failed to change orderItem');
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
export const DeleteItemOrder = createAsyncThunk(
    "order/DeleteItemOrder",
    async ({token,id}, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/orderitems/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
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
export const ChangeQuantity = (data) => {
    return async function check(dispatch, getState) {
    const token=getState().authentication.token;
    await dispatch(ChangeItemQuanlity({data1:{quantity:data.quantity},id:data.OrderItemid, token:token}))
    };
};
export const DeleteOrderItem = (data) => {
    return async function check(dispatch, getState) {
        const token=getState().authentication.token;
        await dispatch(DeleteItemOrder({id:data.OrderItemid, token:token}))
    };
};
export const UpdateOrderItem = ({data, id}) => {
    return async function check(dispatch, getState) {
        const token=getState().authentication.token;
        await dispatch(PutOrderItem({data1:data,id:id, token:token}))
    };
};
export const ChangeStatus = () => {
    return async function check(dispatch, getState) {
        try {
            const token=getState().authentication.token;
            const orderdata=getState().order.Order;
            getState().order.Order.orderitems.map(async (el)=>{
                await dispatch(PutInventory({data1:{
                        change_amount:el.quantity,
                        orderitem:el.idorderitem,
                        productname:el.productname,
                        colorname:el.colorname,
                        sizename:el.sizename,
                    },token:token}))
            })
            const order=await dispatch(PutOrder({data1:{totalamoung:orderdata.orderitems.reduce((acc,el)=>acc+(el.price_at_sale*el.quantity),0),},id:orderdata.idorder, token:token}))
            const user=getState().user.user;
            const userupdate={...user,orders:user.orders.map((el)=>el.idorder==order.payload.result.idorder?order.payload.result:el)}
            dispatch(UserSlice.actions.updateUser(userupdate));
        }catch (e) {
            toasityComponent(`Có lỗi xảy ra:  ${Error.message}`,StatusEnum.ERROR)
        }

    };
};
export default OrderApi;
