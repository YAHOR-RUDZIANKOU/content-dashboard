import { useAppSelector } from "../store/index";
import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
