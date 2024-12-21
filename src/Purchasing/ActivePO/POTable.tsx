import { getActivePOs } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { useStateContext } from "@/context/useStateContext";
import { activePOmenu } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePO from "./CreatePO";
// import { lazy, Suspense } from 'react';
// import Loader from "@/components/ui/Loader";
// import Loading from "@/components/ui/Loading";
// const CreatePO = lazy(() => import('./CreatePO'));
const POTable = () => {
  const navigate = useNavigate();
  const { setError } = useStateContext();
  const [search, setSearch] = useState({
    searchKey: activePOmenu[0].value,
    searchValue: "",
  });
  const {
    data: activePOList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["activePO",search],
    queryFn: () =>
      getActivePOs(
        `/po/active?${search.searchKey}=${search.searchValue}&perPage=90`,
        setError
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    cacheTime: 5 * 60 * 1000, 
    staleTime: 2 * 60 * 1000, 
  });

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex sm:justify-between items-center flex-col sm:flex-row  gap-4">
        <Search menuList={activePOmenu} setSearch={setSearch} search={search} />


        <CreatePO />

      </div>
      <div className=" 3xl:h-[696px] h-[500px]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <table className="w-full caption-bottom ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                <th className="p-6 rounded-tl-xl ">Vendor code</th>
                <th className="p-6">Vendor name</th>
                <th className="p-6">Delivery date</th>
                <th className="p-6">Status</th>
                <th className="p-6">Process status</th>
                <th className="p-6">Document No.</th>
                <th className="p-6">Document date</th>
                <th className="p-6 rounded-tr-xl">Document total</th>
              </tr>
            </thead>
            <tbody className="bg-white [&_tr:last-child]:border-0">
              {!activePOList?.length ? (
                <tr className="h-[24rem] 3xl:h-[36rem]">
                  <td colSpan={8} className="text-center ">
                    No data found
                  </td>
                </tr>
              ) : (
                activePOList.map((po) => (
                  <tr
                    key={po.documentNumber}
                    onClick={() =>
                      navigate(
                        `/purchasing/active-PO/details/${po.documentEntry}`
                      )
                    }
                    className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-6 py-3">{po.vendorCode}</td>
                    <td className="px-6 py-3">{po.vendorName}</td>
                    <td className="px-6 py-3">
                      {po.deliveryDate.split(" ")[0]}
                    </td>
                    <td className="px-6 py-3">{po.status}</td>
                    <td className="px-6 py-3">{po.processStatus}</td>
                    <td className="px-6 py-3">{po.documentNumber}</td>
                    <td className="px-6 py-3">
                      {po.documentDate.split(" ")[0]}
                    </td>
                    <td className="px-6 py-3">
                      {parseFloat(po.documentTotal).toFixed(4)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="sticky -bottom-1 w-full">
              <tr>
                <td colSpan={8}>
                  <Pagination />
                </td>
              </tr>
            </tfoot>
          </table>
        </DataRenderer>
      </div>
    </div>
  );
};

export default POTable;
