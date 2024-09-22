import {
  deleteUserAccount,
  getAllUserListings,
  loginUser,
  registerUser,
  signoutUser,
  userUpdate,
} from "../httpCommon";
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
    dispatch(signInSuccess(data.data));
    return data;
  } catch (error: object | any) {
    console.error(error);
    dispatch(
      signInFailure(
        error?.response?.data?.message || "Error occured while signing in"
      )
    );
    return error?.response?.data;
  }
};

export const signupUser = async (formData: signUpData) => {
  try {
    const { data } = await registerUser(formData);
    return data;
  } catch (error: object | any) {
    console.error(error);
    return error?.response?.data;
  }
};

export const updateUser = async (formData: updateData, dispatch: Dispatch) => {
  try {
    dispatch(updateUserStart());
    const { data } = await userUpdate(formData);
    if (!data?.success) {
      dispatch(updateUserFailure(data?.message));
      return;
    }
    dispatch(updateUserSuccess(data?.data));
  } catch (error: object | any) {
    console.error(error);
    dispatch(
      updateUserFailure(
        error?.response?.data?.message || "Error occured while signing in"
      )
    );
    return error?.response?.data;
  }
};

export const deleteUser = async (user: User, dispatch: Dispatch) => {
  try {
    dispatch(deleteUserStart());
    const { data } = await deleteUserAccount(user);
    if (!data?.success) {
      dispatch(deleteUserFailure(data?.message));
      return;
    }
    dispatch(deleteUserSuccess());
    return data;
  } catch (error: object | any) {
    console.error(error);
    return error?.response?.data;
  }
};

export const signout = async (dispatch: Dispatch) => {
  try {
    dispatch(signOutStart());
    const { data } = await signoutUser();
    if (!data?.success) {
      dispatch(signOutFailure(data?.message));
      return;
    }
    dispatch(signOutSuccess());
    return data;
  } catch (error: object | any) {
    console.error(error);
    return error?.response?.data;
  }
};

export const getAllUserListing = async (user: User) => {
  try {
    const { data } = await getAllUserListings(user);
    if (data?.success) {
      return data.data;
    }
  } catch (error: object | any) {
    console.error(error);
  }
};
