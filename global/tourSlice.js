import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchedTour: null,
    filteredTour: null
};

const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        addSearchedTour(state, action) {
            state.searchedTour = action.payload;
        },
        addFilteredTour(state, action) {
            state.filteredTour = action.payload;
        }
    }
});

export const { addSearchedTour, addFilteredTour } = tourSlice.actions;

export default tourSlice.reducer;

export const getSearchedTourData = state => state.tour.searchedTour;

export const getFilteredTourData = state => state.tour.filteredTour;