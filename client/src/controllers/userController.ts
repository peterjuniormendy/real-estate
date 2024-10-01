import { toast } from "react-toastify";
import {
  deleteUserAccount,
  getAllUserListings,
  googleSignin,
  loginUser,
  registerUser,
  signoutUser,
  userUpdate,
} from "../httpCommon";
import {
  getListingsFailure,
  getListingsStart,
  getListingsSuccess,
} from "../redux/slice/listingSlice";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signInFailure,
  signInStart,
  signInSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  //   signOut,
} from "../redux/slice/userSlice.js";

interface signInData {
  email: string;
  password: string;
}

interface signUpData {
  email: string;
  password: string;
  username: string;
  [key: string]: string | any;
}

interface GoogleData {
  username: string | null;
  email: string | null;
  avatar: string | null;
}

interface updateData {
  id: string;
  email: string;
  password: string;
  username: string;
  avatar: string;
}

interface Dispatch {
  (action: any): void;
}

interface User {
  id: string; // or number depending on your case
  email: string;
  username: string;
  avatar: string;
  password: string;

  [key: string]: string | number; // if you want to allow additional properties
}

export const signinUser = async (formData: signInData, dispatch: Dispatch) => {
  try {
    dispatch(signInStart());
    const { data } = await loginUser(formData);
    if (data?.success) {
      toast.success(data?.message);
    }
    dispatch(signInSuccess(data.data));
    return data;
  } catch (error: object | any) {
    toast.error(
      error?.response?.data?.message || "Error occure while user signin."
    );

    dispatch(
      signInFailure(
        error?.response?.data?.message || "Error occured while signing in"
      )
    );
    return error.response?.data;
  }
};

export const signupUser = async (formData: signUpData) => {
  try {
    const { data } = await registerUser(formData);
    if (data) {
      toast.success(data);
    }
    return data;
  } catch (error: object | any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || "Error occure while user signup."
    );
  }
};

export const signinWithGoogle = async (
  formData: GoogleData,
  dispatch: Dispatch
) => {
  try {
    const { data } = await googleSignin(formData);
    if (data.success) {
      toast.success(data.message);
    }
    dispatch(signInSuccess(data.data));
  } catch (error: object | any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || "Error occure while user signin."
    );
  }
};

export const updateUser = async (formData: updateData, dispatch: Dispatch) => {
  try {
    dispatch(updateUserStart());
    const { data } = await userUpdate(formData);
    if (!data?.success) {
      toast.error(data?.message);
      dispatch(updateUserFailure(data?.message));
      return;
    }
    toast.success(data?.message);
    dispatch(updateUserSuccess(data?.data));
  } catch (error: object | any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || "Error occured while signing in"
    );

    dispatch(
      updateUserFailure(
        error?.response?.data?.message || "Error occured while signing in"
      )
    );
  }
};

export const deleteUser = async (user: User, dispatch: Dispatch) => {
  try {
    dispatch(deleteUserStart());
    const { data } = await deleteUserAccount(user);
    if (!data?.success) {
      toast.error(data?.message);
      dispatch(deleteUserFailure(data?.message));
      return;
    }
    toast.success(data?.message);
    dispatch(deleteUserSuccess());
  } catch (error: object | any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
        "Error occure while deleting user account."
    );
  }
};

export const signout = async (dispatch: Dispatch) => {
  try {
    dispatch(signOutStart());
    const { data } = await signoutUser();
    if (!data?.success) {
      toast.error(data?.message);
      dispatch(signOutFailure(data?.message));
      return;
    }
    toast.success(data?.message);
    dispatch(signOutSuccess());
  } catch (error: object | any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || "Error occure while signing out user."
    );
  }
};

export const getAllUserListing = async (user: User, dispatch: Dispatch) => {
  try {
    dispatch(getListingsStart());
    const { data } = await getAllUserListings(user);
    console.log("listings", data);
    if (data?.success) {
      dispatch(getListingsSuccess(data?.data));
      return;
    }
    dispatch(getListingsFailure(data?.message));
    toast.error(data?.message);
  } catch (error: object | any) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
        "Error occure while getting user listings."
    );
    dispatch(getListingsFailure(error.response?.data?.message));
  }
};
