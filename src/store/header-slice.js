import { createSlice} from '@reduxjs/toolkit';

const headerNameSlice = createSlice({
    name: 'header-classes',
    initialState: {classing: 'first'},
    reducers: {
        changeToFirst(state){state.classing = 'first'},
        changeToSecond(state){state.classing = 'second'},
        changeToThird(state){state.classing = 'third'}
    }}
)

export const headerNameActions = headerNameSlice.actions;

export default headerNameSlice;