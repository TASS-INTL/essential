import { Navigate } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";

export const PublicRouter = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/dashboard" /> : <AuthRouter />;
};
