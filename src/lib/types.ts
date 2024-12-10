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
  documentLine: [
    {
      itemCode: string;
      itemDescription: string;
      price: number;
      quantity: number;
      total: number;
      uomCode: string;
      uomEntry: number;
      warehouseCode: string;
    }
  ];
  attachment: [];
  comments: string;
  currency: string;
  approvalStatus: string;
  processStatus: string;
  approvalEntry: number;
  remarks: string;
};
