import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signinWithGoogle } from "../controllers/userController";
import { app } from "../firebase";
import { useAppDispatch } from "../redux/hooks";

const Oauth = () => {
  const dispatch = useAppDispatch();
  const handleGoogleCLick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const formData = {
        username: result?.user?.displayName,
        email: result?.user?.email,
        avatar: result?.user?.photoURL,
      };
      await signinWithGoogle(formData, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleCLick}
      className="w-full border-2 border-green-600 outline-none ring-1 ring-red-600 p-3
  rounded-lg uppercase hover:opacity-95 bg-slate-50"
    >
      Continue with google
    </button>
  );
};

export default Oauth;
