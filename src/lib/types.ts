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
  comments: string;
  currency: string;
  approvalStatus: string;
  processStatus: string;
  approvalEntry: number;
  remarks: string;
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
  warehouseList:[string]
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

