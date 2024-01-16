import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basket: []
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        updateBasket(state, action) {
            state.basket = action.payload;
        },
        addItem(state, action) {
            state.basket.push(action.payload);
        },
        deleteItem(state, action) {
            state.basket = state.basket.filter(tour => tour._id !== action.payload);
        },
        increaseItemQuantity(state, action) {
            const item = state.basket.find(tour => tour._id === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            const item = state.basket.find(tour => tour._id === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;

            if (item.quantity === 0) {
                basketSlice.caseReducers.deleteItem(state, action);
            }
        },
        clearBasket(state) {
            state.basket = [];
        }
    }
});

export const { updateBasket, addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;

export const getBasket = state => state.basket.basket;