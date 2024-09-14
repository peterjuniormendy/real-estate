import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { useAppDispatch } from "../redux/hooks";
import { signInSuccess } from "../redux/slice/userSlice";

interface Dispatch {
  (action: any): void;
}

const Oauth = () => {
  const dispatch: Dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleGoogleCLick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
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
