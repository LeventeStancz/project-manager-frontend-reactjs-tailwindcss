import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

//protective layer, checks if the user is logged in
//if the user is not logged in it navigates the user to the login page
//state: from where did the user got navigated
//(so when they login they get back to that page)
//replace: replaces the path in the browser history
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
