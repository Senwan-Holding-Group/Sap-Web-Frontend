import { useCallback, useState } from "react";

const useToggleState = (initialState=false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback((close?:boolean) => close?setState(false):setState(true), []);
  return [state, toggle] as const;
};

export default useToggleState;
