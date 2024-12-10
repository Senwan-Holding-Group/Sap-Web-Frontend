import { useAuth } from "@/api/Auth/useAuth";
import { PermissionName, permissions } from "../constants";

export type User = {
  id:number;
  username: string;
  user_type: number;
  exp: number;
};
export const usePermissions = () => {
  const {  user } = useAuth();
  const hasPermission = (permissionName: PermissionName) => {
    if (user) {
      return permissions[permissionName]?.includes(user?.user_type);
    }
  };

  return { hasPermission };
};
