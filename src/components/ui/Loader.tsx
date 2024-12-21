import { createPortal } from "react-dom";
import Loading from "./Loading";
type LoaderProps = {
  enable: boolean;
};
const Loader = ({ enable }: LoaderProps) => {
  return (
    <>
      {enable &&
        createPortal(
          <div className="w-screen h-screen fixed left-0 top-0  bg-black bg-opacity-60 z-[100] flex flex-col gap-y-4 items-center justify-center">
            <Loading />
          </div>,
          document.getElementById("root") as HTMLElement
        )}
    </>
  );
};

export default Loader;
