import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminProtectedRoute({ children }) {
  const token = Cookies.get("admin_token");

  if (!token) {
    return <Navigate to="/login/admin" />;
  }

  return children;
}

export default AdminProtectedRoute;

