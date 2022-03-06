import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [], totalQuantity: 0, totalAmount: 0, changed: false},
    reducers: {
        replaceCart(state, action){
            state.totalAmount = action.payload.totalAmount;
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalAmount += newItem.price;
            state.totalQuantity++;
            state.changed = true;
            if(!existingItem){
                state.items.push({id: newItem.id, price: newItem.price, quantity: 1, totalPrice: newItem.price, title: newItem.title })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalAmount -= existingItem.price;
            state.totalQuantity--;
            state.changed = true;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        removeWholeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalAmount -= existingItem.totalPrice;
            state.totalQuantity -= existingItem.quantity;
            state.changed = true;
            state.items = state.items.filter(item => item.id !== id);
        }
    }
})

export const fetchCartData = (url, token) => {
    return (dispatch) => {
        if(token){
            fetch(`${url}/cart`, {
                method: 'POST',
                body: JSON.stringify({token: token}),
                headers: {'Content-Type' : 'application/json'}
            }).then(response => {
                return response.json()
            }).then(responseData => {
                console.log(responseData);
                let fetchedCart = responseData.items;
                if(!responseData.items){
                    fetchedCart = [];
                }
                let fetchedAmount = 0;
                let fetchedQuantity = 0;
                for (let i = 0; i < fetchedCart.length; i++){
                    fetchedAmount += fetchedCart[i].totalPrice;
                    fetchedQuantity += fetchedCart[i].quantity;
                }
                dispatch(cartActions.replaceCart({items: fetchedCart, totalAmount: fetchedAmount, totalQuantity: fetchedQuantity}))
            }).catch(err => {
                console.log(err);
            })
        }
    }
}

 export const sendCartData = (url, updatedCart, token) => {
    return (dispatch) => {
        fetch(`${url}/update-cart`, {
            method: 'POST',
            body: JSON.stringify({token: token, cart: updatedCart}),
            headers: {'Content-Type': 'application/json'}
          }).then(response => {
            return response.json();
          }).then(responseData => {
            console.log(responseData);
          }).catch(err => {
            console.log(err);
          })
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice;