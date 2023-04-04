import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/UseValidAuth";
import { checkUserRole } from "../../Utils/CheckUserRole";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  const currentUser = useSelector((state) => state?.auth?.user);
  
  const redirect = () => {
    if (checkUserRole(currentUser, "admin")) {
        return <Navigate to="/admin/dashboard" />;
      }
      else if (checkUserRole(currentUser, "student")){
        return <Navigate to="/player/1" />
      }
  }

  return !isLoggedIn ? children : redirect();
}
