/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  accountsList,
  ActiveAP,
  ActiveGRPO,
  ActivePo,
  CalculateCreditNote,
  CalculateRebate,
  CreateOutgoingPayment,
  CreditNote,
  DasboardData,
  DocumentLine,
  InventoryMissingQTY,
  Item,
  MissingQTY,
  POPrintLayout,
  ToBePaid,
  Transfer,
  TransferPrintLayout,
  Vendor,
  VendorSelectList,
} from "@/lib/types";
import api, { baseURL } from ".";
import {
  CopyToAPInvoice,
  CreateCreditNote,
  CreatePORequest,
  CreateTransferRequest,
  EditDocumentRequest,
  EditTransferRequest,
  ItemImport,
  LoginRequest,
} from "@/lib/formsValidation";
import { cn } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";

export const login = async (
  data: LoginRequest,
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>,
  navigate: NavigateFunction,
  form: UseFormReturn<LoginRequest>
) => {
  try {
    const res = await api.post("/auth/login", data);
    setToken(res.data.token);
    secureLocalStorage.setItem("token", res.data.token);
    navigate("/sap/dashboard", { replace: true });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }

    console.log(error);
  }
};
export const getDashboardData = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as DasboardData;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const checkAlert = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.status;
  } catch (error: any) {
    console.log(error);
  }
};
export const importItems = async (
  url: string,
  data: { [x: string]: string | number }[],
  Code: string,
  form: UseFormReturn<ItemImport>,
  handleClose: () => void,
  setdocLine: React.Dispatch<React.SetStateAction<DocumentLine[]>>,
  toast: any
) => {
  try {
    const res = await api.post(`${url}/${Code}`, data);
    console.log(res.data);
    setdocLine(res.data.data);
    handleClose();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "Items imported successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }
    console.log(error);
  }
};
export const exportItemsBy = async (
  by: string,
  value: string,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  toast?: any
) => {
  try {
    if (setIsLoading) setIsLoading(true);
    const res = await api.get(`${baseURL}/export/items/${by}/${value}`, {
      responseType: "blob",
    });
    // const url = `${baseURL}/export/items/${by}/${value}`;
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", `${by}:${value}`);
    tempLink.setAttribute("target", "_blank");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "File downloaded successfully",
      });
    }
  } catch (error: any) {
    console.error("Error downloading file:", error);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description:
          error.message === "Network Error"
            ? "Something went wrong check your connection"
            : error.response?.data?.message || "Error downloading file",
      });
    }
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};
export const exportReport = async (
  query: string,
  fileName: string,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  toast?: any
) => {
  try {
    if (setIsLoading) setIsLoading(true);
    const res = await api.get(`${baseURL}/export/report?filter=${query}`, {
      responseType: "blob",
    });
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", fileName);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "File downloaded successfully",
      });
    }
  } catch (error: any) {
    console.error("Error downloading file:", error);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description:
          error.message === "Network Error"
            ? "Something went wrong check your connection"
            : error.response?.data?.message || "Error downloading file",
      });
    }
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};
export const exportCheck = async (
  fileName: string,

  date: string,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  toast?: any
) => {
  try {
    if (setIsLoading) setIsLoading(true);
    const res = await api.get(`${baseURL}/export/check?paymentDate=${date}`, {
      responseType: "blob",
    });
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", fileName);

    tempLink.setAttribute("target", "_blank");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "File downloaded successfully",
      });
    }
  } catch (error: any) {
    console.error("Error downloading file:", error);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description:
          error.message === "Network Error"
            ? "Something went wrong check your connection"
            : error.response?.data?.message || "Error downloading file",
      });
    }
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};
export const exportItems = async (
  fileName: string,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  toast?: any
) => {
  try {
    if (setIsLoading) setIsLoading(true);
    const res = await api.get(`${baseURL}/export/item-master-data`, {
      responseType: "blob",
    });
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", fileName);
    tempLink.setAttribute("target", "_blank");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "File downloaded successfully",
      });
    }
  } catch (error: any) {
    console.error("Error downloading file:", error);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description:
          error.message === "Network Error"
            ? "Something went wrong check your connection"
            : error.response?.data?.message || "Error downloading file",
      });
    }
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};
export const downloadAttachments = async (
  filePath: string,
  fileName: string,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  toast?: any
) => {
  try {
     if (setIsLoading) setIsLoading(true);
     const res = await api.get(`${baseURL}/${filePath}`, {
      responseType: "blob"
    });
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", `${fileName}.pdf`);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(url);
     if (toast) {
      toast({
        className: cn(
          "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "File downloaded successfully",
      });
    }
  } catch (error: any) {
    console.error("Error downloading file:", error);
    if (toast) {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description:
          error.message === "Network Error"
            ? "Something went wrong check your connection"
            : error.response?.data?.message || "Error downloading file",
      });
    }
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};
export const getReports = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getReportTypes = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
//********************************************* */
// Active PO and Draft
export const getActivePOs = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as ActivePo[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getActivePObyDocEntry = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as ActivePo;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const getPOPrintLayout = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as POPrintLayout;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const createPo = async (
  PO: CreatePORequest,
  form: UseFormReturn<CreatePORequest>,
  setdocLine: React.Dispatch<React.SetStateAction<DocumentLine[]>>,
  toast: any,
  queryClient: QueryClient
) => {
  try {
    const { warehouseCode, ...filteredPO } = PO;
    console.log(warehouseCode);
    await api.post("/po", filteredPO);
    queryClient.invalidateQueries();
    form.reset();
    setdocLine([]);
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "PO created successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description: error.response.data.message,
    });
    console.log(error);
  }
};
export const EditDocument = async (
  url: string,
  PO: EditDocumentRequest,
  form: UseFormReturn<EditDocumentRequest>,
  setdocLine: React.Dispatch<React.SetStateAction<DocumentLine[]>>,
  toast: any,
  queryClient: QueryClient
) => {
  try {
    await api.patch(url, PO);
    setdocLine([]);
    queryClient.invalidateQueries();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "PO Edited successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description: error.response.data.message,
    });
    console.log(error);
  }
};
export const cancelPO = async (
  docEntry: number,
  navigate: NavigateFunction,
  toast: any,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setisSubmitting(true);
  try {
    await api.post(`/po/cancel/${docEntry}`);

    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "PO Canceled  successfully",
    });
    navigate(-1);
  } catch (error: any) {
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description:
        error.message === "Network Error"
          ? "Something went wrong check your connection"
          : error.response.data.message,
    });
    console.log(error);
  }
  setisSubmitting(false);
};
export const saveDraftToPO = async (
  docEntry: number,
  navigate: NavigateFunction,
  toast: any,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setisSubmitting(true);
  try {
    await api.post(`/po/draft/${docEntry}`);

    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "Draft saved to document  successfully",
    });
    navigate(-1);
  } catch (error: any) {
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description:
        error.message === "Network Error"
          ? "Something went wrong check your connection"
          : error.response.data.message,
    });
    console.log(error);
  }
  setisSubmitting(false);
};
//******************************************** */
//Active GRPO and A/P Invoice
export const getActiveGRPO = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as ActiveGRPO[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getActiveAP = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as ActiveAP[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const copyToAp = async (
  docEntry: string | undefined,
  body: CopyToAPInvoice,
  form: UseFormReturn<CopyToAPInvoice>,
  toast: any,
  queryClient: QueryClient
) => {
  try {
    await api.post(`/ap/${docEntry}`, body);
    queryClient.invalidateQueries();
    form.reset();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "A/P created successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description: error.response.data.message,
    });
    console.log(error);
  }
};
export const copyToCreditMemo = async (
  docEntry: string | undefined,
  body: CopyToAPInvoice,
  form: UseFormReturn<CopyToAPInvoice>,
  toast: any,
  queryClient: QueryClient
) => {
  try {
    await api.post(`/credit-memo/${docEntry}`, body);
    queryClient.invalidateQueries();
    form.reset();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "Credit Memo created successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description: error.response.data.message,
    });
    console.log(error);
  }
};
export const getActiveGRPObyDocEntry = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as ActiveGRPO;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const getActiveAPbyDocEntry = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as ActiveAP;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const EditGRPOLine = async (
  url: string,
  docLine: DocumentLine[],
  setdocLine: React.Dispatch<React.SetStateAction<DocumentLine[]>>,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any,
  queryClient: QueryClient
) => {
  const newValues = {
    documentLines: docLine.map((item) => {
      return {
        lineNumber: item.lineNumber,
        action: item.action,
        invoicePrice: item.invoicePrice.toString(),
        priceStatus: item.priceStatus,
      };
    }),
  };
  setisSubmitting(true);
  try {
    await api.patch(url, newValues);
    setdocLine([]);
    queryClient.invalidateQueries();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: " Edited successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: "Something went wrong check your connection",
      });
    } else {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: error.response.data.message,
      });
    }
    console.log(error);
  }
  setisSubmitting(false);
};
//******************************************** */
//Payments Outgoing/Incoming
export const getAccountsList = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data as accountsList;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getToBePaid = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as ToBePaid[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getToBePaidByVendor = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data[0] as ToBePaid;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const getToBePaidDocByvendor = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as CreateOutgoingPayment;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const getCreditNoteByVendorCode = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data as CalculateCreditNote[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const getRebateByVendorCode = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);

    return res.data as CalculateRebate[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const postRebate = async (
  url: string,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any,
  queryClient: QueryClient
) => {
  setisSubmitting(true);
  try {
    await api.post(url);
    queryClient.invalidateQueries();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: " Repate Calculated successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: "Something went wrong check your connection",
      });
    } else {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: error.response.data.message,
      });
    }
    console.log(error);
  }
  setisSubmitting(false);
};
export const postAllRebate = async (
  url: string,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any,
  queryClient: QueryClient,
  setRebateData: React.Dispatch<
    React.SetStateAction<
      [
        {
          vendor: string;
          res: string;
        }
      ]
    >
  >
) => {
  setisSubmitting(true);
  try {
    const res = await api.post(url);
    setRebateData(res.data);
    queryClient.invalidateQueries();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: `Rebate Calculated successfully`,
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: "Something went wrong check your connection",
      });
    } else {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: error.response.data.message,
      });
    }
    console.log(error);
  }
  setisSubmitting(false);
};
export const postAllCreditNote = async (
  url: string,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any,
  queryClient: QueryClient
) => {
  setisSubmitting(true);
  try {
    await api.post(url);
    queryClient.invalidateQueries();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: " Credit Note Calculated successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: "Something went wrong check your connection",
      });
    } else {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: error.response.data.message,
      });
    }
    console.log(error);
  }
  setisSubmitting(false);
};
export const postCreditNote = async (
  url: string,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any,
  queryClient: QueryClient
) => {
  setisSubmitting(true);
  try {
    await api.post(url);
    queryClient.invalidateQueries();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: " Repate Calculated successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: "Something went wrong check your connection",
      });
    } else {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: error.response.data.message,
      });
    }
    console.log(error);
  }
  setisSubmitting(false);
};
export const postOutgoingPayments = async (
  url: string,
  navigate: NavigateFunction,
  data: any,
  toast: any
) => {
  try {
    await api.post(url, data);
    navigate("/sap/payments/tobe-paid");
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: " Rebate Calculated successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: "Something went wrong check your connection",
      });
    } else {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: error.response.data.message,
      });
    }
    console.log(error);
  }
};

//******************************************** */
//Finanace Matching
export const getMatchingGRPO = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as ActiveGRPO[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getMatchingGRPOByDocEntry = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as ActiveGRPO;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};

//******************************************** */
//Transfer
export const getTransferList = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as Transfer[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getTransferbyDocEntry = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as Transfer;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const createTransferRequest = async (
  transfer: CreateTransferRequest,
  form: UseFormReturn<CreateTransferRequest>,
  setdocLine: React.Dispatch<React.SetStateAction<DocumentLine[]>>,
  toast: any,
  queryClient: QueryClient
) => {
  try {
    await api.post("/transferReq", transfer);
    queryClient.invalidateQueries();
    form.reset();
    setdocLine([]);
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "PO created successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description: error.response.data.message,
    });
    console.log(error);
  }
};
export const EditTransfer = async (
  url: string,
  transfer: EditTransferRequest,
  form: UseFormReturn<EditTransferRequest>,
  setdocLine: React.Dispatch<React.SetStateAction<DocumentLine[]>>,
  toast: any,
  queryClient: QueryClient
) => {
  try {
    await api.patch(url, transfer);
    setdocLine([]);
    queryClient.invalidateQueries();
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "PO Edited successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description: error.response.data.message,
    });
    console.log(error);
  }
};
export const canceltransfer = async (
  docEntry: number,
  navigate: NavigateFunction,
  toast: any,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setisSubmitting(true);
  try {
    await api.post(`/transferReq/cancel/${docEntry}`);

    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "PO Canceled  successfully",
    });
    navigate(-1);
  } catch (error: any) {
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description:
        error.message === "Network Error"
          ? "Something went wrong check your connection"
          : error.response.data.message,
    });
    console.log(error);
  }
  setisSubmitting(false);
};
export const getTransferPrintLayout = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as TransferPrintLayout;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
//******************************************** */
// Vendor and Credit Notes
export const getVendors = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as Vendor[];
  } catch (error: any) {
    console.log(error);
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const getCreditNoteList = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as CreditNote[];
  } catch (error: any) {
    console.log(error);
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const getcreditNoteByDocEntry = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as CreditNote;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const cancelCreditNote = async (
  docEntry: number,
  navigate: NavigateFunction,
  toast: any,
  setisSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setisSubmitting(true);
  try {
    await api.post(`/credit-note/cancel/${docEntry}`);

    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "Credit note Canceled  successfully",
    });
    navigate(-1);
  } catch (error: any) {
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description:
        error.message === "Network Error"
          ? "Something went wrong check your connection"
          : error.response.data.message,
    });
    console.log(error);
  }
  setisSubmitting(false);
};
export const createCreditNote = async (
  creditNote: any,
  form: UseFormReturn<CreateCreditNote>,
  setSelectedFields: React.Dispatch<React.SetStateAction<string[]>>,
  toast: any,
  queryClient: QueryClient
) => {
  try {
    await api.post("/credit-note", creditNote);
    queryClient.invalidateQueries();
    form.reset();
    setSelectedFields([]);
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "Credit Note created successfully",
    });
  } catch (error: any) {
    if (error.message === "Network Error") {
      form.setError("root", {
        message: "Something went wrong check your connection",
      });
    } else {
      form.setError("root", {
        message: error.response.data.message,
      });
    }
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description: error.response.data.message,
    });
    console.log(error);
  }
};
export const getVendorsbyCode = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as Vendor;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    console.log(error);
  }
};
export const getDocVendors = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  toast: any
) => {
  try {
    const res = await api.get(url);
    return res.data.data as VendorSelectList[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description:
        error.message === "Network Error"
          ? "Something went wrong check your connection"
          : error.response.data.message,
    });
  }
};
//Missing QTY
export const getMissingQuantity = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as MissingQTY[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getMissingbyDocEntry = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as MissingQTY;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
//******************************************************* */
//Inventory Missing Qty
export const getInventoryMissingQuantity = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as InventoryMissingQTY[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getInventoryMissingbyDocEntry = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as InventoryMissingQTY;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
//******************************************************* */
//Items
export const getItemsByVendor = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as DocumentLine[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getItemByCode = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as Item;
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
export const getItems = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const res = await api.get(url);
    setTotalPage(res.data.totalPage);
    return res.data.data as Item[];
  } catch (error: any) {
    if (error.message === "Network Error") {
      setError("Something went wrong check your connection");
      console.log(error);
    } else {
      setError(error.response.data.message);
    }
  }
};
