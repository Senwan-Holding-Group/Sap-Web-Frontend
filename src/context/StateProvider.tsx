import { useState } from "react";
import { StateContext } from "./stateContext";

type StateProviderProps = {
  children: React.ReactNode;
};
const StateProvider = ({ children }: StateProviderProps) => {
  const [error, setError] = useState<string | undefined >();

  return (
    <StateContext.Provider value={{ error, setError }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
