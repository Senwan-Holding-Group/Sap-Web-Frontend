import { useState } from "react";
import { StateContext } from "./stateContext";

type StateProviderProps = {
  children: React.ReactNode;
};
const StateProvider = ({ children }: StateProviderProps) => {
  const [error, setError] = useState<string | undefined >();
  const [totalPage, setTotalPage] = useState<number>(0);

  return (
    <StateContext.Provider value={{ error, setError,totalPage, setTotalPage }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
