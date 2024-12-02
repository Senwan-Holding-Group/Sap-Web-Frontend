import { useAuth } from "@/api/Auth/useAuth";
import { PermissionName } from "@/lib/constants";
import { usePermissions } from "@/lib/hooks/UsePermissions";
import { Navigate, useLocation } from "react-router-dom";


type ProtectedRouteProps = {
  permission?: PermissionName;
  children: React.ReactNode;
};
const ProtectedRoute = ({ permission,children }: ProtectedRouteProps) => {
  const { token } = useAuth();
  const location = useLocation();


    const {hasPermission}=usePermissions()
    if(token&&!hasPermission(permission!)){
        return <></>
    }
    return token?children:<Navigate to="/تسجيل_الدخول"state={{ from: location }} replace />
};

export default ProtectedRoute;
