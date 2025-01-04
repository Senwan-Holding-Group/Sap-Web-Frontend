/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActivePo,
  DasboardData,
  DocumentLine,
  InventoryMissingQTY,
  Item,
  MissingQTY,
  POPrintLayout,
  Transfer,
  TransferPrintLayout,
  Vendor,
  VendorSelectList,
} from "@/lib/types";
import api from ".";
import {
  CreatePORequest,
  CreateTransferRequest,
  EditDocumentRequest,
  EditTransferRequest,
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
export const checkAlert = async (
  url: string,
) => {
  try {
    const res = await api.get(url);
    return res.status
  } catch (error: any) {
  
    console.log(error);
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
    await api.post("/po", PO);
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
// Vendor
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
//ITems
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
