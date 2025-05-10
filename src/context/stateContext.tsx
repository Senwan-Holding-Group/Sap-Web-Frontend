import { createContext } from "react";

export type StateContextType = {
  error: string | undefined ;
  setError: React.Dispatch<React.SetStateAction<string | undefined >>;
  totalPage: number ;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
  setRebateData: React.Dispatch<React.SetStateAction<[{ vendor: string; res: string }]>>,
  rebateData: [{ vendor: string; res: string }];
};

export const StateContext = createContext<StateContextType | undefined>(undefined);