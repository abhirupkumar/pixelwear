import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    subTotal: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.slug === action.payload.slug);
            if (itemInCart) {
                itemInCart.qty++;
            } else {
                state.cart.push({ ...action.payload, qty: 1 });
            }
            // let subTotal = 0;
            // let cart = state.cart;
            // console.log(cart)
            // for (item in cart) {
            //     subTotal += item.qty * item.price;
            // }
            // state.subTotal = subTotal;
            state.subTotal = state.cart.reduce((acc, item) => {
                return acc + item.price * item.qty
            }, 0)
        },
        removeFromCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.slug === action.payload.slug);
            if (itemInCart.qty <= 1) {
                let newCart = state.cart.filter((item) => item.slug !== action.payload.slug);
                state.cart = newCart;
            } else {
                itemInCart.qty--;
            }
            // let subTotal = 0;
            // let cart = state.cart;
            // for (item in cart) {
            //     subTotal += item.qty * item.price;
            // }
            // state.subTotal = subTotal;
            state.subTotal = state.cart.reduce((acc, item) => {
                return acc + item.price * item.qty
            }, 0)
        },
        clearCart: (state) => {
            state.cart = [];
            state.subTotal = 0;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer