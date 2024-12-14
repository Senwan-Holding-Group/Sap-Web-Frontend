enum Role {
  ADMIN,
  MODIFIER,
  USER,
}
export const permissions = {
  user: [Role.ADMIN],
  "record.create": [Role.ADMIN, Role.MODIFIER],
  "record.edit": [Role.ADMIN, Role.MODIFIER],
  "record.read": [Role.ADMIN, Role.MODIFIER, Role.USER],
};
export type PermissionName = keyof typeof permissions;
export const activePOmenu = [
  { label: "Vendor code", value: "vendorCode" },
  { label: "Vendor name", value: "vendorName" },
  { label: "Delivery date", value: "deliveryDate" },
  { label: "Status", value: "status" },
  { label: "Document number", value: "documentNumber" },
  { label: "Document date", value: "documentDate" },
  { label: "Document total", value: "documentTotal" },
];
export const draftmenu = [
  { label: "Vendor code", value: "vendorCode" },
  { label: "Vendor name", value: "vendorName" },
  { label: "Document number", value: "documentNumber" },
  { label: "Status", value: "status" },
  { label: "Process status", value: "processStatus" },
];
export const itemMenu = [
  { label: "Item code", value: "itemCode" },
  { label: "Item name ", value: "itemName" },
  { label: "Item barcode", value: "barcode" },

];
