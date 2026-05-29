import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const userString = localStorage.getItem("user");

  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
