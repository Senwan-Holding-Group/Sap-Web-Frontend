// import { useAuth } from "@/api/Auth/useAuth";
// import { PermissionName, permissions } from "../constants";

export type User = {
  code:string;
  name: string;
  phone: string;
  role:string
  exp:number
};
// export const usePermissions = () => {
//   const {  user } = useAuth();
//   const hasPermission = (permissionName: PermissionName) => {
//     if (user) {
//       return permissions[permissionName]?.includes(user?.role);
//     }
//   };

//   return { hasPermission };
// };
