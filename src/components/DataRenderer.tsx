import { ReactNode } from "react";
import Loading from "./ui/Loading";
import { useStateContext } from "@/context/useStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessageExclamation } from "@fortawesome/pro-solid-svg-icons";
type props = {
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
};

const DataRenderer = ({ children, isError, isLoading }: props) => {
  const { error } = useStateContext();
  if (isLoading) {
    return (
      <div className="flex items-center  h-full justify-center w-full  ">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-8">
        <div className="text-red-500 h-20 w-20 mb-4">
          <FontAwesomeIcon className="h-full w-full" icon={faMessageExclamation} />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Something went wrong
          </h3>
          <div className="bg-geantSap-error-50 text-geantSap-error-500 hover:bg-geantSap-error-100  rounded-lg p-4 max-w-md">
            {String(error)}
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default DataRenderer;
