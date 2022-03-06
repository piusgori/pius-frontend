import { createSlice } from "@reduxjs/toolkit";

const preloaderSlice = createSlice({
    name: 'preloader',
    initialState: {isLoaded: true},
    reducers: {changeLoaded(state){state.isLoaded = !state.isLoaded}}
})

export const preloaderActions = preloaderSlice.actions;

export default preloaderSlice;