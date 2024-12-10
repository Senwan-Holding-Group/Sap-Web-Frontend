import { ReactNode } from "react";
import Loading from "./ui/Loading";
import { useStateContext } from "@/context/useStateContext";
type props = {
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
};

const DataRenderer = ({ children, isError, isLoading }: props) => {
  const {error} =useStateContext()
  if (isLoading) {
    return (
      <div  className="flex items-center h-full justify-center w-full  ">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center">{String(error)}</div>; // Convert error to string
  }

  return children;
};

export default DataRenderer;
