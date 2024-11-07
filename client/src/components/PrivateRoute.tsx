import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Outlet, Navigate } from "react-router-dom";
import { signout, validateSession } from "../controllers/userController";
import { useCallback, useEffect, useState } from "react";

const SESSION_DURATION = 60 * 60 * 24 * 1000; // 24 hours in milliseconds

const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const getLastActivityTimestamp = (): number => {
    const timestamp = localStorage.getItem("lastActivityTimestamp");
    return timestamp ? parseInt(timestamp, 10) : Date.now();
  };

  const updateLastActivityTimestamp = () => {
    localStorage.setItem("lastActivityTimestamp", Date.now().toString());
  };

  const isSessionValid = useCallback((): boolean => {
    const lastActivity = getLastActivityTimestamp();
    return Date.now() - lastActivity <= SESSION_DURATION;
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isValid = await validateSession();
        if (isValid) {
          if (isSessionValid()) {
            updateLastActivityTimestamp();
            setIsAuthenticated(true);
          } else {
            await signout(dispatch);
            setIsAuthenticated(false);
          }
        } else {
          await signout(dispatch);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error validating session:", error);
        await signout(dispatch);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [dispatch, isSessionValid]);

  useEffect(() => {
    if (user) {
      updateLastActivityTimestamp();
    }
  }, [user]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
