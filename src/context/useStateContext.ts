import { useContext } from "react";
import { StateContext, StateContextType } from "./stateContext";

export const useStateContext = (): StateContextType => {
  const stateContext = useContext(StateContext);
  if (!stateContext) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return stateContext;
};
