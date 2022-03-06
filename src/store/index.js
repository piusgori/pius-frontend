import { configureStore } from "@reduxjs/toolkit";
import headerNameSlice from "./header-slice";
import preloaderSlice from "./preloader-slice";
import loginSlice from "./login-slice";
import cartSlice from "./cart-slice";
import accountSlice from "./account-slice";
import searchSlice from "./search-slice";
import discountSlice from "./discount-slice";


const store = configureStore({
    reducer: {preloader: preloaderSlice.reducer, heading: headerNameSlice.reducer, login: loginSlice.reducer, cart: cartSlice.reducer, account: accountSlice.reducer, search: searchSlice.reducer, discount: discountSlice.reducer}
})

export default store;