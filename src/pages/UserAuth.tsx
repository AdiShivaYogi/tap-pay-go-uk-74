
import UserAuthPage from "@/features/auth/components/UserAuthPage";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const UserAuth = () => {
  const { user } = useAuth();
  
  // Redirect to roadmap if user is already logged in
  if (user) {
    return <Navigate to="/roadmap" replace />;
  }
  
  return <UserAuthPage />;
};

export default UserAuth;
