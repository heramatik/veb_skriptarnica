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
                existItem.qty += 1;
            } else {
                state.cartItems.push({
                    ...item,
                    qty: 1,
                });
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

            return updateCart(state);
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;

            if (action.payload !== "Kartica") {
                state.selectedCard = null;
            }

            return updateCart(state);
        },

        saveSelectedCard: (state, action) => {
            state.selectedCard = action.payload;

            return updateCart(state);
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
    saveSelectedCard,
    clearCart,
    increaseQty,
    decreaseQty,
    saveDiscountPercentage,
} = cartSlice.actions;

export default cartSlice.reducer;