export type ActivePo = {
  vendorCode: string;
  vendorName: string;
  deliveryDate: string;
  status: string;
  documentNumber: number;
  documentEntry: number;
  documentKey: string;
  documentDate: string;
  documentTotal: string;
  section: string;
  documentLine: DocumentLine[];
  attachment: [];
  administrativeData: {
    createdBy: string;
    createdOn: string;
    editedBy: string;
    editedOn: string;
  };
  comments: string;
  currency: string;
  approvalStatus: string;
  processStatus: string;
  approvalEntry: number;
  remarks: string;
};
export type MissingQTY = {
  vendorCode: string;
  vendorName: string;
  deliveryDate: string;
  documentNumber: number;
  documentEntry: number;
  documentDate: string;
  documentTotal: string;
  administrativeData: {
    createdBy: string;
    createdOn: string;
    editedBy: string;
    editedOn: string;
  };
  documentLine: MissingQTYDoctLine[];
  grValue: string;
  difference: string;
  section: string;
};
export type MissingQTYDoctLine = {
  Quantity: number;
  difference: number;
  grQuantity: number;
  itemCode: string;
  itemDescription: string;
  lineNum: number;
  price: number;
  warehouseCode: string;
};
export type DocumentLine = {
  itemCode: string;
  itemDescription: string;
  itemName: string;
  price: number;
  quantity: number;
  total: number;
  uomCode: string;
  uomEntry: number;
  line: number;
  lineNum: number;
  uomGroup: string;
  barcodeList: [{ barcode: string }];
  warehouseCode: string;
  warehouseList: [string];
};
export type MenuList = {
  label: string;
  value: string;
};
export type VendorSelectList = {
  vendorCode: string;
  vendorName: string;
  vendor: string;
};

export type Vendor = {
  vendorCode: string;
  vendorName: string;
  vendorNameEN: string;
  vendor: string;
  status: string;
  accountBalance: string;
  poBalance: string;
  grBalance: string;
  administrativeData: {
    createdBy: string;
    createdOn: string;
    editedBy: string;
    editedOn: string;
  };
  general: {
    contactPersonId: string;
    contactPersonName: string;
    contactPersonPhoneNumber: string;
    companyAddress: string;
    companyEmail: string;
    companyPhoneNumber: string;
  };
  attachment: [];
  payments: {
    "Account Balance": number;
    "Goods receipt POs balance": number;
    "Payment terms": string;
    "Purchase balance": number;
  };
  rebate: {
    "Target 1": number;
    "Target 2": number;
    "Target 3": number;
    "Target 4": number;
    "Target 5": number;
    "Target 6": number;
    "slab 1 'fixed' ": number;
    "slab 2": number;
    "slab 3": number;
    "slab 4": number;
    "slab 5": number;
    "slab 6": number;
  };
};
export type Item = {
  itemCode: string;
  itemName: string;
  barcode: string;
  uomCode: string;
  purchaseItem: string;
  saleItem: string;
  section: string;
  department: string;
  family: string;
  subFamily: string;
  active:string;
  uomGroup: number;
  plu: string;
  administrativeData: {
    createdBy: string;
    createdOn:string;
    editedBy: string;
    editedOn: string;
  };
  pricing: [{
    UomCode:string
    CodeBars: string;
    Discount: string;
    ListName: string;
    Price: number;
  }];
  stock: {
    DC: number;
    RCB: number;
    RCV: number;
  };
  cost: {
    DC: number;
    RCB: number;
    RCV: number;
  };
  vendor: [{ vendorCode: string; vendorName:string}];
};
