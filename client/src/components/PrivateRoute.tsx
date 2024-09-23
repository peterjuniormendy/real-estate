import { useAppSelector } from "../redux/hooks";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
