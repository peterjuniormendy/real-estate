import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ListingState {
  listings: any[];
  currentListing: object | null;
  loading: boolean;
  error: string | null;
}

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
    clearListings: () => {
      return initialState;
    },
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
  clearListings,
} = listingSlice.actions;
// export the reducer
export default listingSlice.reducer;
