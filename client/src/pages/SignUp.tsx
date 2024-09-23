import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { signupUser } from "../controllers/userController";
import { useAppSelector } from "../redux/hooks";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.email === "") {
      return setError("Email is required");
    }
    if (formData.username === "") {
      return setError("Username is required");
    }
    if (formData.password === "") {
      return setError("Password is required");
    }
    try {
      const res = await signupUser(formData);
      if (res?.message === "User register successfully.") {
        navigate("/login");
        // reset form data
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      }
      setIsLoading(false);
    } catch (error) {
      setError("An error occurred during sign-up.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  }, [error]);

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
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
          type="text"
          name="username"
          placeholder="username"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Submitting..." : "Sign up"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to="/login">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
