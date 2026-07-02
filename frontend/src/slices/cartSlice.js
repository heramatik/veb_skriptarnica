import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "Gotovina",
        selectedCard: null,
        discountPercentage: 0,
        discountAmount: 0,
    };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find(
                (x) => x.id === item.id
            );

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.id === existItem.id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (x) => x.id !== action.payload
            );

            return updateCart(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;

            localStorage.setItem(
                "cart",
                JSON.stringify(state)
            );
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload.method;
            state.selectedCard = action.payload.card || null;

            localStorage.setItem(
                "cart",
                JSON.stringify(state)
            );
        },

        clearCart: (state) => {
            state.cartItems = [];

            return updateCart(state);
        },

        increaseQty: (state, action) => {
            const item = state.cartItems.find(
                (x) => x.id === action.payload
            );

            if (item) {
                item.qty += 1;
            }

            return updateCart(state);
        },

        decreaseQty: (state, action) => {
            const item = state.cartItems.find(
                (x) => x.id === action.payload
            );

            if (item && item.qty > 1) {
                item.qty -= 1;
            }

            return updateCart(state);
        },

        saveDiscountPercentage: (state, action) => {
            state.discountPercentage = action.payload;

            return updateCart(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCart,
    increaseQty,
    decreaseQty,
    saveDiscountPercentage,
} = cartSlice.actions;

export default cartSlice.reducer;