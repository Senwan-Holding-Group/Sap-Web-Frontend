import { createContext } from "react";

export type StateContextType = {
  error: string | undefined ;
  setError: React.Dispatch<React.SetStateAction<string | undefined >>;
  totalPage: number ;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
};

export const StateContext = createContext<StateContextType | undefined>(undefined);