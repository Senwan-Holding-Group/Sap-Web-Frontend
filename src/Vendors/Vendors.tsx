import { Outlet,  } from "react-router-dom";

const Vendors = () => {

  return (
    <div className="overflow-hidden w-full flex  flex-col gap-y-4 ">
        <h1 className="text-geantSap-primary-500 font-bold text-2xl leading-[36px] ">
          Vendors
        </h1>

      <Outlet />
    </div>
  );
};

export default Vendors;