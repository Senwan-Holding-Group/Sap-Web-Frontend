import { z } from "zod";

export const CreatePOFormSchema = z.object({
  vendorCode: z.string().min(1, { message: "Vendor Code is required." }),
  comments: z.string().min(3, { message: "Comments are required." }),
  deliveryDate: z.date({
    required_error: "Delivery Date is required.",
  }),
  postingDate: z.date({
    required_error: "Posting Date is required.",
  }),
  section: z.string(),
  documentLines: z.array(
    z.object({
      itemCode: z.string(),
      quantity: z.string(),
      price: z.string(),
      uomCode: z.string(),
      uomEntry: z.number(),
      warehouseCode: z.string(),
    })
  ),
});
export type CreatePORequest = z.infer<typeof CreatePOFormSchema>;
export const CreateTransferRequestFormSchema = z.object({
  comments: z.string().min(3, { message: "Comments are required." }),
  deliveryDate: z.date({
    required_error: "Delivery Date is required.",
  }),
  postingDate: z.date({
    required_error: "Posting Date is required.",
  }),
  section: z.string().min(1, { message: "Section is required." }),
  warehouseCode: z.string(),
  transferType: z.string(),
  requestSource: z.string(),
  documentLines: z.array(
    z.object({
      itemCode: z.string(),
      quantity: z.string(),
      uomCode: z.string(),
      uomEntry: z.number(),
    })
  ),
});
export type CreateTransferRequest = z.infer<
  typeof CreateTransferRequestFormSchema
>;
export const EditTransferRequestFormSchema = z.object({
  comments: z.string(),
  deliveryDate: z.date(),
  postingDate: z.date(),
  section: z.string(),
  warehouseCode: z.string(),
  transferType: z.string(),
  requestSource: z.string(),
  documentLines: z.array(
    z.object({
      itemCode: z.string(),
      quantity: z.string(),
      uomCode: z.string(),
      uomEntry: z.number(),
    })
  ),
});
export type EditTransferRequest = z.infer<typeof EditTransferRequestFormSchema>;

export const editDocumentFormSchema = z.object({
  vendorCode: z.string(),
  comments: z.string(),
  deliveryDate: z.date(),
  postingDate: z.date(),
  section: z.string(),
  documentLines: z.array(
    z.object({
      itemCode: z.string(),
      quantity: z.string(),
      price: z.string(),
      uomCode: z.string(),
      uomEntry: z.number(),
      warehouseCode: z.string(),
    })
  ),
});
export type EditDocumentRequest = z.infer<typeof editDocumentFormSchema>;
export const itemImport = z.object({
  item: z.string(),
 
});
export type ItemImport = z.infer<typeof itemImport>;

export const loginFormSchema = z.object({
  code: z.string().min(3, { message: "UserCode is required." }),
  password: z.string().min(4, { message: "Password is required " }),
});
export type LoginRequest = z.infer<typeof loginFormSchema>;
