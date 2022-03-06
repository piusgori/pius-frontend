import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
    name: 'Discount',
    initialState: {items: []},
    reducers: {
        setItems(state, action){
            const items = action.payload;
            state.items = items;
        }
    }
})

export const discountActions = discountSlice.actions;

export default discountSlice;