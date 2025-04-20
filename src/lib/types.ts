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
export type ActiveGRPO = {
  vendorCode: string;
  vendorName: string;
  receivingDate: string;
  status: string;
  invoiceNumber: string;
  documentNumber: number;
  documentEntry: number;
  documentKey: string;
  documentDate: string;
  documentTotal: string;
  section: string;
  documentLine: DocumentLine[];
  attachment: AttachmentList[];
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
export type ActiveAP = {
  vendorCode: string;
  vendorName: string;
  receivingDate: string;
  dueDate: string;
  status: string;
  invoiceNumber: string;
  documentNumber: number;
  documentEntry: number;
  documentKey: string;
  documentDate: string;
  documentTotal: string;
  section: string;
  documentLine: DocumentLine[];
  attachment: AttachmentList[];
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
export type Transfer = {
  documentNumber: number;
  documentDate: string;
  documentTotal: string;
  currency: string;
  deliveryDate: string;
  status: string;
  section: string;
  comments: string;
  documentEntry: number;
  documentKey: string;
  requestSource: string;
  transferTypeList: [string];
  warehouseCode: string;
  warehouseList: [string];
  transferType: string;
  documentLine: DocumentLine[];
  attachment: [];
  administrativeData: {
    createdBy: string;
    createdOn: string;
    editedBy: string;
    editedOn: string;
  };
  approvalStatus: string;
  processStatus: string;
  approvalEntry: number;
  remarks: string;
};
export type ToBePaid = {
  vendorCode: string;
  vendorName: string;
  paymentAmount: string;
  paymentDate: string;
  invoiceNumber: string;
  cashAmount: string;
  bankAmount: string;
  bank: string;
  bankName: string;
  bankAccount: string;
  paymentType: string;
};
export type CalculateCreditNote = {
  type: string;
  totalAmount: string;
};
export type CalculateRebate = {
  CardCode: string;
  CardName: string;
  PaymentTotal: string;
  ReceiveTotal: string;
  RebateValue: string;
  Percentage: string;
};
export type CreateOutgoingPayment = {
  cash:string,
  bank:string,
  result: [
    {
      documentType: string;
      invoiceType: string;
      docmentNumber: number;
      docmentEntry: number;
      vendorRef: string;
      remark: string;
      vendorCode: string;
      vendorName: string;
      documentDate: string;
      paymentDate: string;
      documentTotal: string;
    }
  ];
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
export type InventoryMissingQTY = {
  warehouseCode: string;
  requestSource: string;
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
  trValue: string;
  transferType: string;
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
  lineNumber: number;
  stock: string;
  uomGroup: string;
  priceStatus: string;
  invoicePrice: number;
  action: string;
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
  status: string;
  uomGroup: number;
  plu: string;
  administrativeData: {
    createdBy: string;
    createdOn: string;
    editedBy: string;
    editedOn: string;
  };
  pricing: [
    {
      UomCode: string;
      CodeBars: string;
      Discount: string;
      ListName: string;
      Price: number;
    }
  ];
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
  vendor: [{ vendorCode: string; vendorName: string }];
};
export type CreditNote = {
  documentEntry: number;
  documentNumber: number;
  documentDate: string;
  createDate: string;
  remark: string;
  status: string;
  vendorName: string;
  documentTotal: string;
  creditNoteList: CreditNoteList[];
  administrativeData: {
    createdBy: string;
    createdOn: string;
    editedBy: string;
    editedOn: string;
  };
  type: string;
  vendorCode: string;
};

export type CreditNoteList = {
  externalScreensTwoV: number;
  tastingCampaign: number;
  magazineOneYear: number;
  inventoryPriceDifference: number;
  supportWithOffers: number;
  compensationDamagedGoods: number;
  inventoryDiscount: number;
  magazineHalfPage: number;
  rentingBooth: number;
  magazineSixMonths: number;
  magazineWithCompanyLogo: number;
  magazineTwoPage: number;
  rentingSpecificFloorSpace: number;
  magazineOnePage: number;
  addNewItem: number;
  fridgeDiscount: number;
  quarterlyDiscount: number;
  singleBranch: number;
  speAddDis: number;
  yearlyDis: number;
  advertisingDiscount: number;
  semiAnnualDiscount: number;
};
export type POPrintLayout = {
  vendorCode: string;
  vendorName: string;
  contactPerson: {
    contactPerson: string;
  };
  telephone: string;
  documentNumber: number;
  documentDate: string;
  shippingAddress: string;
  status: string;
  deliveryDate: string;
  documentLine: POPrintLayoutDocLine[];
};
export type TransferPrintLayout = {
  fromWarehouse: string;
  toWarehouse: string;
  requestSource: string;
  documentNumber: number;
  documentDate: string;
  status: string;
  deliveryDate: string;
  documentLine: POPrintLayoutDocLine[];
};
export type POPrintLayoutDocLine = {
  barcode: string;
  itemCode: string;
  itemDescription: string;
  price: number;
  quantity: number;
  total: number;
  uomCode: string;
  uomGroup: string;
  warehouseCode: string;
};
export type DasboardData = {
  netReceive: string;
  vendors: number;
  items: number;
};
export type AlertData = {
  message: string;
  alertTime: string;
  data: [];
};
export type AttachmentList = {
  attachingDate: string;
  fileName: string;
  filePath: string;
  fileExtension: string;
};
