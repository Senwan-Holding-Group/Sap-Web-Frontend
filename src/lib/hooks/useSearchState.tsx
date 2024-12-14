import { useCallback, useState } from "react";

const useSearchState = (key: string, value: string) => {
  const [state, setState] = useState({
    searchKey: key,
    searchValue: value,
  });
  const set = useCallback(
    () => setState({ ...state, searchKey: key, searchValue: value }),
    [key, state, value]
  );
  return [state, set] as const;
};

export default useSearchState;
