import { useCallback, useState } from "react";

const useToggleState = (initialState=false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((value) => !value), []);
  return [state, toggle] as const;
};

export default useToggleState;
