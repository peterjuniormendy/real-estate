import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  user: object | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
