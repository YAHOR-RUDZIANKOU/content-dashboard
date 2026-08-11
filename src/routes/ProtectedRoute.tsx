import { useAppSelector } from "../store/index";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  if (isAuth) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
