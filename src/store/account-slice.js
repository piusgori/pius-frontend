import { createSlice } from "@reduxjs/toolkit";


const accountSlice = createSlice({
    name: 'account',
    initialState: {account: {}, products: [], person: ''},
    reducers: {
        setAccount(state, action){
            const account = action.payload;
            state.account = account;
        },
        setProducts(state, action){
            const products = action.payload;
            state.products = products;
        },
        setPerson(state, action){
            const person = action.payload;
            state.person = person;
        }
    }
})
export const accountActions = accountSlice.actions;
export default accountSlice;