import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleGuard = ({ allowedRoles, children }) => {
  const { role } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  if (!token || role === null) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleGuard;
