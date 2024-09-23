import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { signinUser } from "../controllers/userController";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { error, loading, user } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (data: FormData) => {
    const { email, password } = data;
    if (!email || !password) {
      return "Please fill in all fields";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm(formData);
    try {
      const { success } = await signinUser(formData, dispatch);
      if (success) {
        navigate("/profile");
        // reset form data
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4"
      >
        {error && (
          <div className="w-full bg-red-200 text-red-400 py-2 text-center">
            <p>{error}</p>
          </div>
        )}

        <input
          id="email"
          type="text"
          name="email"
          placeholder="email"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Submitting..." : "Sign in"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
