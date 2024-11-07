import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { deleteUser, signout, updateUser } from "../controllers/userController";
import { FormData, User } from "../interfaces";

const Profile = () => {
  const dispatch = useAppDispatch();
  const profileRef = useRef<HTMLInputElement>(null);
  const { user, loading } = useAppSelector((state) => state.user) as {
    user: User | null;
    loading: boolean;
  };
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    id: user?._id || "",
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar || "",
        password: "",
      });
    }
  }, [user]);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        setUploadError(
          (error as Error)?.message || "Error occurred while uploading image"
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        });
      }
    );
  };

  const feedback = uploadError ? (
    <span className="text-red-600">{uploadError}</span>
  ) : uploadProgress > 0 && uploadProgress < 100 ? (
    <span className="text-slate-700">{`Uploading ${uploadProgress}%`}</span>
  ) : uploadProgress === 100 ? (
    <span className="text-green-700">Image successfully uploaded</span>
  ) : (
    ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser(formData, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    if (!user || !user.password) return;

    const userWithPassword = {
      ...user,
      password: user.password,
      id: user._id,
    };

    await deleteUser(userWithPassword, dispatch);
    if (!user || !user.password) return;
  };

  const handleUserSignout = async () => {
    await signout(dispatch);
  };

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          onChange={(e) => setFile(e.target.files?.[0])}
          type="file"
          ref={profileRef}
          hidden
          accept="image/*"
          name="avatar"
        />
        <img
          onClick={() => profileRef.current?.click()}
          src={formData.avatar || user?.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-center">{feedback}</p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          onChange={(e) => handleInputChange(e)}
          name="username"
          value={formData?.username}
        />
        <input
          disabled
          type="text"
          placeholder="email"
          className="border bg-slate-100 p-3 rounded-lg"
          name="email"
          value={formData?.email}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={(e) => handleInputChange(e)}
          name="password"
          value={formData?.password}
        />
        <button
          // disabled={loading}
          type="submit"
          className="bg-slate-700 text-white text-center rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <Link
          to="/create-listing"
          className="bg-green-700 text-white text-center rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-95"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span
          onClick={handleUserSignout}
          className="text-red-700 cursor-pointer"
        >
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
