import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Assuming your AuthProvider is properly set up

const PrivateRoutes = () => {
  const { user } = useAuth(); // Assumed `user` has `isAuthenticated` property
  const location = useLocation();
  
  return user?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
