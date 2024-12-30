import {  getVendors } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { useStateContext } from "@/context/useStateContext";
import { vendorsmenu } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorsTable = () => {
  const navigate = useNavigate();
  const { setError, setTotalPage, totalPage } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [search, setSearch] = useState({
    searchKey: vendorsmenu[0].value,
    searchValue: "",
  });
  const {
    data: vendorsList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["vendorsList", search, currentPage],
    queryFn: () =>
      getVendors(
        `/vendor?${search.searchKey}=${search.searchValue}&perPage=15&page=${currentPage}`,
        setError,
        setTotalPage
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex sm:justify-between items-center flex-col sm:flex-row  gap-4">
        <Search menuList={vendorsmenu} setSearch={setSearch} search={search} />
      </div>
      <div className=" 3xl:h-[47.5rem] sm:h-[34.5rem] h-[52rem] max-h-[52rem] border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <table className="w-full caption-bottom ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                <th className="p-6  rounded-tl-xl">Vendor code</th>
                <th className="p-6">Name(Ar)</th>
                <th className="p-6">Status</th>
                <th className="p-6">Account Balance</th>
                <th className="p-6">PO balance</th>
                <th className="p-6 rounded-tr-xl">GR balance</th>
              </tr>
            </thead>
            <tbody className="bg-white [&_tr:last-child]:border-0 ">
             {!vendorsList?.length ? (
                <tr className="h-[24rem] 3xl:h-[36rem]">
                  <td colSpan={6} className="text-center ">
                    No data found
                  </td>
                </tr>
              ) : (
                vendorsList.map((vendor) => (
              <tr
                key={vendor.vendorCode}
                onClick={() => navigate(`/sap/vendors/details/${vendor.vendorCode}`)}
                className="text-geantSap-black text-nowrap font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-6 py-3">{vendor.vendorCode}</td>
                <td className="px-6 py-3">{vendor.vendorName} </td>
                <td className="px-6 py-3">{vendor.status} </td>
                <td className="px-6 py-3">{vendor.accountBalance}</td>
                <td className="px-6 py-3">{vendor.poBalance} </td>
                <td className="px-6 py-3">{vendor.grBalance} </td>
              </tr>
                )))}
            </tbody>
            <tfoot className="sticky -bottom-1 w-full">
              <tr>
                <td colSpan={6}>
                  <Pagination
                    totalPages={totalPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </DataRenderer>
      </div>
    </div>
  );
};

export default VendorsTable;
