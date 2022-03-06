import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'Search',
    initialState: {result: [], personResult: {}, personProducts: [], resultProducts: [], resultPeople: [], resultCategories: []},
    reducers: {
        setReady(state, action){
            const result = action.payload;
            state.result = result;
        },
        setPersonAndProduct(state, action){
            const products = action.payload.products;
            const person = action.payload.person;
            state.personResult = person;
            state.personProducts = products;
        },
        setresultPeopleAndCategories(state, action){
            const people = action.payload.people;
            const categories = action.payload.categories;
            const productNames = action.payload.productNames;
            const allProducts = action.payload.allProducts;
            state.resultPeople = people;
            state.resultCategories = categories;
            for(let i = 0; i < allProducts.length; i++){
                for(let j = 0; j < productNames.length; j++){
                    if(allProducts[i].title === productNames[j]){
                        state.resultProducts.push(allProducts[i]);
                    }
                }
            }
        },
        returnResultProducts(state, action){
            state.resultProducts = [];
        }
    }
});

export const searchActions = searchSlice.actions;

export default searchSlice;