import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    subTotal: 0,
    token: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.slug === action.payload.slug);
            if (!itemInCart) {
                state.cart.push({ ...action.payload, qty: action.payload.qty });
            }
            else {
                if (itemInCart.qty != action.payload.qty) {
                    itemInCart.qty = action.payload.qty;
                }
            }
            state.subTotal = state.cart.reduce((acc, item) => {
                return acc + item.price * item.qty
            }, 0)
        },
        increment: (state, action) => {
            const itemInCart = state.cart.find((item) => item.slug === action.payload.slug);
            if (itemInCart) {
                itemInCart.qty++;
            } else {
                state.cart.push({ ...action.payload, qty: 1 });
            }
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
            state.subTotal = state.cart.reduce((acc, item) => {
                return acc + item.price * item.qty
            }, 0)
        },
        clearCart: (state) => {
            state.cart = [];
            state.subTotal = 0;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        removeToken: (state, action) => {
            state.token = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, increment, removeFromCart, clearCart, setToken, removeToken } = cartSlice.actions

export default cartSlice.reducer