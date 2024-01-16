import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "../global/tourSlice";
import basketReducer from "../global/basketSlice";

const store = configureStore({
    reducer: {
        tour: tourReducer,
        basket: basketReducer
    },
});

export default store;