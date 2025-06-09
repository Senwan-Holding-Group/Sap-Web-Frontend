enum Resource {
  PURCHASING = "PURCHASING",
  TRANSFER = "TRANSFER",
}

enum Action {
  ADD = "ADD",
  EDIT = "EDIT",
  VIEW = "VIEW",
  DELETE = "DELETE",
  CANCEL = "CANCEL",
}

type ResourcePermission = {
  resource: Resource;
  actions: Action[];
};

export const permissions: ResourcePermission[] = [
  {
    resource: Resource.PURCHASING,
    actions: [
      Action.ADD,
      Action.EDIT,
      Action.VIEW,
      Action.DELETE,
      Action.CANCEL,
    ],
  },
  {
    resource: Resource.TRANSFER,
    actions: [
      Action.ADD,
      Action.EDIT,
      Action.VIEW,
      Action.DELETE,
      Action.CANCEL,
    ],
  },
];

export function hasPermission(resource: Resource, action: Action): boolean {
  const resourcePermission = permissions.find((p) => p.resource === resource);
  if (!resourcePermission) return false;
  return resourcePermission.actions.includes(action);
}

export function getResourceActions(resource: Resource): Action[] {
  const resourcePermission = permissions.find((p) => p.resource === resource);
  return resourcePermission?.actions || [];
}
export type User = {
  code: string;
  name: string;
  phone: string;
  role: object;
  warehouseList: string[];
  transferType: string[];
  requestSource: string;
  sectionList: string[];
  paymentType: "Cash" | "Bank";
  exp: number;
  reqWhsList: string[];
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
