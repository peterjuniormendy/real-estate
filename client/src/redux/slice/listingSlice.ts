import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Listing, ListingState } from "../../interfaces";

// set the initial state
const initialState: ListingState = {
  listings: [],
  currentListing: null,
  loading: false,
  error: null,
};

// create the slice
export const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    // action creators
    getListingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getListingsSuccess: (state, action: PayloadAction<any>) => {
      state.listings = action.payload;
      state.loading = false;
      state.error = null;
    },
    getListingsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCurrentListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCurrentListingSuccess: (state, action: PayloadAction<object>) => {
      state.currentListing = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCurrentListingFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createListingSuccess: (state, action: PayloadAction<Listing>) => {
      state.listings.push(action.payload);
      state.currentListing = action.payload;
      state.loading = false;
      state.error = null;
    },
    createListingFailure: (state) => {
      state.currentListing = null;
      state.loading = false;
      state.error = null;
    },
    deleteListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteListingSuccess: (state, action: PayloadAction<string>) => {
      state.listings.filter((listing) => listing._id !== action.payload);
      state.currentListing = null;
      state.loading = false;
      state.error = null;
    },
    deleteListingFailure: (state) => {
      state.currentListing = null;
      state.loading = false;
      state.error = null;
    },
    getListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getListingSuccess: (state, action: PayloadAction<Listing>) => {
      state.currentListing = action.payload;
      state.loading = false;
      state.error = null;
    },
    getListingFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    editListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    editListingSuccess: (state, action: PayloadAction<Listing>) => {
      state.listings = state.listings.map((listing) =>
        listing._id === action.payload?._id ? action.payload : listing
      );
      state.currentListing = action.payload;
      state.loading = false;
      state.error = null;
    },
    editListingFailure: (state) => {
      state.currentListing = null;
      state.loading = false;
      state.error = null;
    },
    // clearListings: () => {
    //   return initialState;
    // },
  },
});
// export the actions
export const {
  getListingsStart,
  getListingsSuccess,
  getListingsFailure,
  getCurrentListingStart,
  getCurrentListingSuccess,
  getCurrentListingFailure,
  createListingStart,
  createListingSuccess,
  createListingFailure,
  getListingStart,
  getListingSuccess,
  getListingFailure,
  deleteListingStart,
  deleteListingSuccess,
  deleteListingFailure,
  editListingStart,
  editListingSuccess,
  editListingFailure,
  // clearListings,
} = listingSlice.actions;
// export the reducer
export default listingSlice.reducer;
