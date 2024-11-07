import { toast } from "react-toastify";
import { purgeStoredState } from "../redux/store";
import { User, ApiError } from "../interfaces";
import { AppDispatch } from "../redux/store";
import {
  deleteUserAccount,
  getAllUserListings,
  getUserInfo,
  googleSignin,
  loginUser,
  registerUser,
  signoutUser,
  userUpdate,
  validateUserSession,
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
  [key: string]: string | undefined;
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

export const validateSession = async (): Promise<boolean> => {
  try {
    const response = await validateUserSession();
    return response.data.isValid;
  } catch (error) {
    console.error("Error validating session:", error);
    return false;
  }
};

export const signinUser = async (
  formData: signInData,
  dispatch: AppDispatch
) => {
  try {
    dispatch(signInStart());
    const { data } = await loginUser(formData);
    if (data?.success) {
      toast.success(data?.message);
    }
    dispatch(signInSuccess(data.data));
    localStorage.setItem("lastActivityTimestamp", Date.now().toString());
    return data;
  } catch (error: unknown) {
    toast.error(
      (error as ApiError)?.response?.data?.message ||
        "Error occurred while user signin."
    );

    dispatch(
      signInFailure(
        (error as ApiError)?.response?.data?.message ||
          "Error occured while signing in"
      )
    );
    return (error as ApiError)?.response?.data;
  }
};

export const signupUser = async (formData: signUpData) => {
  try {
    const { data } = await registerUser(formData);
    if (data) {
      toast.success(data);
    }
    return data;
  } catch (error: unknown) {
    console.error(error);
    toast.error(
      (error as ApiError)?.response?.data?.message ||
        "Error occure while user signup."
    );
  }
};

export const signinWithGoogle = async (
  formData: GoogleData,
  dispatch: AppDispatch
) => {
  try {
    const { data } = await googleSignin(formData);
    if (data.success) {
      toast.success(data.message);
    }
    localStorage.setItem("lastActivityTimestamp", Date.now().toString());
    dispatch(signInSuccess(data.data));
  } catch (error: unknown) {
    console.error(error);
    toast.error(
      (error as ApiError)?.response?.data?.message ||
        "Error occure while user signin."
    );
  }
};

export const updateUser = async (
  formData: updateData,
  dispatch: AppDispatch
) => {
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
  } catch (error: unknown) {
    console.error(error);
    toast.error(
      (error as ApiError)?.response?.data?.message ||
        "Error occured while signing in"
    );

    dispatch(
      updateUserFailure(
        (error as ApiError)?.response?.data?.message ||
          "Error occured while signing in"
      )
    );
  }
};

export const deleteUser = async (user: User, dispatch: AppDispatch) => {
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
    dispatch(purgeStoredState());
  } catch (error: unknown) {
    console.error(error);
    toast.error(
      (error as ApiError)?.response?.data?.message ||
        "Error occure while deleting user account."
    );
  }
};

export const signout = async (dispatch: AppDispatch) => {
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
    dispatch(purgeStoredState());
    localStorage.removeItem("lastActivityTimestamp");
  } catch (error: unknown) {
    console.error(error);
    toast.error(
      (error as ApiError)?.response?.data?.message ||
        "Error occure while signing out user."
    );
  }
};

export const getAllUserListing = async (user: User, dispatch: AppDispatch) => {
  try {
    dispatch(getListingsStart());
    const { data } = await getAllUserListings(user);
    if (data?.success) {
      dispatch(getListingsSuccess(data?.data));
      return;
    }
    dispatch(getListingsFailure(data?.message));
    toast.error(data?.message);
  } catch (error: unknown) {
    console.error(error);
    toast.error(
      (error as ApiError)?.response?.data?.message ||
        "Error occure while getting user listings."
    );
  }
};

export const getUser = async (id: string) => {
  try {
    const { data } = await getUserInfo(id);
    console.log("data", data);
    return data;
  } catch (error: unknown) {
    console.log("error occured: ", error);
  }
};
