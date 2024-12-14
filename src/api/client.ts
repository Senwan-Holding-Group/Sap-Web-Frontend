/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivePo, DocumentLine } from "@/lib/types";
import api from ".";
export const getActivePOs = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    const list: ActivePo[] = await res.data.data;
    return list;
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
    const activePo: ActivePo = await res.data.data;
    return activePo;
  } catch (error: any) {
    console.log(error);
    setError(error.message);
  }
};
export const getItems = async (
  url: string,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    const res = await api.get(url);
    const items: DocumentLine[] = await res.data.data;    
    return items;
  } catch (error: any) {
    console.log(error);
    setError(error.message);
  }
};
