import Search from "@/components/ui/Search";
import { Outlet, useLocation } from "react-router-dom";

const Vendors = () => {
    const location = useLocation();

  return (
    <div className="overflow-hidden w-full flex  flex-col gap-y-4 ">
        <h1 className="text-geantSap-primary-500 font-bold text-2xl leading-[36px] ">
          Vendors
        </h1>
      {!location.pathname.includes("details") && <Search />}

      <Outlet />
    </div>
  );
};

export default Vendors;
