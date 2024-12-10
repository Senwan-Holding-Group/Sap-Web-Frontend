import { createContext } from "react";

export type StateContextType = {
  error: string | undefined ;
  setError: React.Dispatch<React.SetStateAction<string | undefined >>;
};

export const StateContext = createContext<StateContextType | undefined>(undefined);