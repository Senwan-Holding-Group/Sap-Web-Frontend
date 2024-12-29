import { getDashboardData } from "@/api/client";
import { useStateContext } from "@/context/useStateContext";
import {
  faBasketShopping,
  faSitemap,
  faUsers,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { setError } = useStateContext();
  const { data: dasboardData } = useQuery({
    queryKey: ["dasboardData"],
    queryFn: () => getDashboardData(`/po/dashboard`, setError),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  return (
    <div className="space-y-8">
      <div className="font-bold space-y-2">
        <h1 className=" text-2xl leading-[36px] text-geantSap-primary-500">
          Dashboard
        </h1>
        <p className="text-base text-geantSap-black">
          {new Date().toDateString()}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="font-bold bg-geantSap-primary-5 p-6 rounded-[18px] space-y-6 ">
          <h1 className=" text-lg leading-[27px]">Total items </h1>
          <p className="text-[40px] leading-[60px] text-geantSap-primary-500 flex justify-between">
            {dasboardData?.items}
            <span className="rounded-full bg-geantSap-primary-25 size-12 flex items-center justify-center">
              <FontAwesomeIcon className="w-[20px] h-[17px]" icon={faSitemap} />
            </span>
          </p>
        </div>
        <div className="font-bold bg-geantSap-primary-5 p-6 rounded-[18px] space-y-6">
          <h1 className=" text-lg leading-[27px]">Total Vendors </h1>
          <p className="text-[40px] leading-[60px] text-geantSap-primary-500 flex justify-between">
            {dasboardData?.vendors}
            <span className="rounded-full bg-geantSap-primary-25 size-12 flex items-center justify-center">
              <FontAwesomeIcon className="w-[20px] h-[17px]" icon={faUsers} />
            </span>
          </p>
        </div>
        <div className="font-bold bg-geantSap-primary-5 p-6 rounded-[18px] space-y-6">
          <h1 className=" text-lg leading-[27px]">Total purchase </h1>
          <p className="text-[40px] leading-[60px] text-geantSap-primary-500 flex justify-between">
            {dasboardData&&parseFloat(dasboardData?.netReceive).toFixed(2)}
            <span className="rounded-full bg-geantSap-primary-25 size-12 flex items-center justify-center">
              <FontAwesomeIcon
                className="w-[20px] h-[17px]"
                icon={faBasketShopping}
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
