import { useAuth } from "@/api/Auth/useAuth";
// import { PermissionName } from "@/lib/constants";
// import { usePermissions } from "@/lib/hooks/UsePermissions";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  // permission?: PermissionName;
  children: React.ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, isLoading } = useAuth();
  const location = useLocation();

  // Don't render anything while checking authentication
  if (isLoading) {
    return null;
  }

  if (token === null) {
    // Only redirect if token is explicitly null
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
