import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <div>Profile</div>;
};

export default Profile;
