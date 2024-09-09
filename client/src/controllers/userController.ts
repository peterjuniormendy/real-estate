import { loginUser } from "../httpCommon";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  //   signOut,
} from "../redux/slice/userSlice.js";

interface FormData {
  email: string;
  password: string;
}
interface Dispatch {
  (action: any): void;
}

export const signinUser = async (formData: FormData, dispatch: Dispatch) => {
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
