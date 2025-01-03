enum Role {
  ADMIN,

}
export const permissions = {
  "purchasing": [Role.ADMIN],

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
export const missingQTYmenu = [
  { label: "Vendor code", value: "vendorCode" },
  { label: "Vendor name", value: "vendorName" },
  { label: "PO value", value: "poValue" },
  { label: "GR value", value: "GRValue" },
  { label: "Delivery date", value: "deliveryDate" },
  { label: "Document NO", value: "documentNumber" },
  { label: "Document date", value: "documentDate" },
];
export const draftmenu = [
  { label: "Vendor code", value: "vendorCode" },
  { label: "Vendor name", value: "vendorName" },
  { label: "Document number", value: "documentNumber" },
  { label: "Status", value: "status" },
  { label: "Process status", value: "processStatus" },
];
export const vendorsmenu = [
  { label: "Vendor code", value: "vendorCode" },
  { label: "Vendor name", value: "vendorName" },
  { label: "Status", value: "status" },
  { label: "Account balance", value: "accountBalance" },
  { label: "PO balance", value: "poBalance" },
  { label: "GR balance", value: "grBalance" },
];
export const itemVendorMenu = [
  { label: "Item code", value: "itemCode" },
  { label: "Item name ", value: "itemName" },
  { label: "Item barcode", value: "barcode" },
];
export const itemsMenu = [
  { label: "Item code", value: "itemCode" },
  { label: "Item name ", value: "itemName" },
  { label: "Status", value: "status" },
  { label: "Department", value: "department" },
  { label: "Section", value: "section" },
  { label: "Barcode", value: "barcode" },
];
export const sectionList = [
  { sectionCode: "11", section: "BEVERAGE" ,sectionName:"11 - BEVERAGE"},
  { sectionCode: "12", section: "DPH",sectionName:"12 - DPH" },
  { sectionCode: "13", section: "CIGARETTES" ,sectionName:"13 - CIGARETTES"},
  { sectionCode: "14", section: "GROCERY",sectionName:"14 - GROCERY" },
  { sectionCode: "21", section: "ULTRA FRESH",sectionName:"21 - ULTRA FRESH" },
  { sectionCode: "22", section: "DAIRY PRODUCTS SS" ,sectionName:"22 - DAIRY PRODUCTS SS"},
  { sectionCode: "23", section: "DELICATESSEN SS" ,sectionName:"23 - DELICATESSEN SS"},
  { sectionCode: "24", section: "FROZEN FOOD" ,sectionName:"24 - FROZEN FOOD"},
  { sectionCode: "80", section: "CONS. FMCG" ,sectionName:"80 - CONS. FMCG"},
  { sectionCode: "50", section: "DELICATESSEN COUNTER",sectionName:"50 - DELICATESSEN COUNTER" },
  { sectionCode: "51", section: "DAIRY COUNTER",sectionName:"51 - DAIRY COUNTER" },
  { sectionCode: "52", section: "BUTCHERY" ,sectionName:"52 - BUTCHERY"},
  { sectionCode: "53", section: "FISHERY" ,sectionName:"53 - FISHERY"},
  { sectionCode: "54", section: "BAKERY" ,sectionName:"54 - BAKERY"},
  { sectionCode: "55", section: "PASTRY" ,sectionName:"55 - PASTRY"},
  { sectionCode: "56", section: "FRUITS & VEGETABLES",sectionName:"56 - FRUITS & VEGETABLES" },
  { sectionCode: "57", section: "SNACK BAR",sectionName:"57 - SNACK BAR" },
  { sectionCode: "70", section: "APPLIANCES",sectionName:"70 - APPLIANCES" },
  { sectionCode: "71", section: "GIFT & SHOP",sectionName:"71 - GIFT & SHOP" },
  { sectionCode: "72", section: "HIFI SOUND",sectionName:"72 - HIFI SOUND" },
  { sectionCode: "73", section: "HOUSEHOLD GOODS",sectionName: "73 - HOUSEHOLD GOODS"},
  { sectionCode: "74", section: "MOBILITY" ,sectionName:"74 - MOBILITY"},
  { sectionCode: "75", section: "OFFICE AUTOMATION" ,sectionName:"75 - OFFICE AUTOMATION"},
  { sectionCode: "76", section: "PHOTO" ,sectionName:"76 - PHOTO"},
  { sectionCode: "77", section: "TV & VCR",sectionName:"77 - TV & VCR" },
  { sectionCode: "30", section: "CAMPING GARDENING" ,sectionName:"30 - CAMPING GARDENING"},
  { sectionCode: "31", section: "CAR" ,sectionName:"31 - CAR"},
  { sectionCode: "32", section: "DO IT YOURSELF" ,sectionName:"32 - DO IT YOURSELF"},
  { sectionCode: "33", section: "HOUSE EQUIPMENT" ,sectionName:"33 - HOUSE EQUIPMENT"},
  { sectionCode: "34", section: "HOUSEWARE" ,sectionName:"34 - HOUSEWARE"},
  { sectionCode: "35", section: "LIBRARY" ,sectionName:"35 - LIBRARY"},
  { sectionCode: "36", section: "LUGGAGE" ,sectionName:"36 - LUGGAGE"},
  { sectionCode: "37", section: "SPORTS" ,sectionName:"37 - SPORTS"},
  { sectionCode: "38", section: "STATIONERY",sectionName:"38 -STATIONERY" },
  { sectionCode: "39", section: "TOYS" ,sectionName:"39 - TOYS"},
  { sectionCode: "60", section: "ACCESSORIES",sectionName:"60 - ACCESSORIES" },
  { sectionCode: "61", section: "BABY" ,sectionName:"61 - BABY"},
  { sectionCode: "62", section: "CHILDREN" ,sectionName:"62 - CHILDREN"},
  { sectionCode: "63", section: "HOME LINEN" ,sectionName:"63 - HOME LINEN"},
  { sectionCode: "64", section: "LADIES" ,sectionName:"64 - LADIES"},
  { sectionCode: "65", section: "MEN" ,sectionName:"65 - MEN"},
  { sectionCode: "66", section: "SHOES" ,sectionName:"66 - SHOES"},
  { sectionCode: "81", section: "CONS. FRESH FOOD" ,sectionName:"81 - CONS. FRESH FOOD"},
  { sectionCode: "82", section: "CONS. H.H.HOLD" ,sectionName:"82 - CONS. H.H.HOLD"},
  { sectionCode: "83", section: "CONS. L.H.Hold" ,sectionName:"83 - CONS. L.H.Hold"},
  { sectionCode: "90", section: "CONSUMABLES" ,sectionName:"90 - CONSUMABLES"},
  { sectionCode: "99", section: "Management RCV" ,sectionName:"99 - Management RCV"},
  { sectionCode: "999",section: "MIX" ,sectionName:"999 - MIX"},
];

