/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivePo, DocumentLine, Item, MissingQTY, Vendor, VendorSelectList } from "@/lib/types";
import api from ".";
import {
  CreatePORequest,
  EditDocumentRequest,
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
    form.setError("root", {
      message: error.response.data.message,
    });
    console.log(error);
  }
};
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
    console.log(error);
    setError(error.message);
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
    console.log(error);
    setError(error.message);
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
    form.setError("root", {
      message: error.response.data.message,
    });
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
    form.setError("root", {
      message: error.response.data.message,
    });
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
      description: error.response.data.message,
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
      description: error.response.data.message,
    });
    console.log(error);
  }
  setisSubmitting(false);
};
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
    if(error.status===404){

      setError("Not found check your entry");
    }else{
      setError(error.message);
    }

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
    console.log(error);
    setError(error.message);
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
    console.log(error);
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description: error.response.data.message,
    });
    setError(error.response.data.message);
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
    console.log(error);
    if(error.status===404){

      setError("Not found check your entry");
    }else{
      setError(error.message);
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
    console.log(error);
    setError(error.message);
  }
};
//ITems
export const getItemsByVendor = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    return res.data.data as DocumentLine[];
  } catch (error: any) {
    console.log(error);
    setError(error.message);
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
    console.log(error);
    setError(error.message);
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
    console.log(error);
    if(error.status===404){

      setError("Not found check your entry");
    }else{
      setError(error.message);
    }

  }
};


