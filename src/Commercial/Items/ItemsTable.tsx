// import Pagination from "@/components/ui/Pagination";
import { exportItems, getItems } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { useStateContext } from "@/context/useStateContext";
import { itemsMenu } from "@/lib/constants";
import { useToast } from "@/lib/hooks/use-toast";
import { faFileExport, faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import {  formatDate } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemsTable = () => {
  const navigate = useNavigate();
  const { setError, setTotalPage, totalPage } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleDownload = async () => {
    await  exportItems(`Item master Data ${formatDate(Date.now(),'PP')}`,setIsLoading, toast);
  };
  const [search, setSearch] = useState({
    searchKey: itemsMenu[0].value,
    searchValue: "",
  });
  const {
    data: itemsList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["itemsList", search, currentPage],
    queryFn: () =>
      getItems(
        `/item?${search.searchKey}=${search.searchValue}&perPage=15&page=${currentPage}`,
        setError,
        setTotalPage
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  return (
    <div className="space-y-4 h-full ">
      <div className="flex sm:justify-between items-center flex-col sm:flex-row  gap-4">
        <Search menuList={itemsMenu} setSearch={setSearch} search={search} />
        <Button
            type="button"
            onClick={handleDownload}
            disabled={isLoading}
            className="bg-geantSap-primary-500  disabled:bg-geantSap-gray-50 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base">
            <span className="size-6 flex items-center justify-center">
              <FontAwesomeIcon className="" icon={isLoading?faSpinner:faFileExport} spin={isLoading}/>
            </span>
            <span className="font-medium text-base ">Export Items</span>
          </Button>
      </div>
      <div className=" sm:h-[calc(100dvh-9.75rem)]  h-[calc(100dvh-13.25rem)]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <table className="w-full caption-bottom ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                <th className="p-6  rounded-tl-xl">Item code</th>
                <th className="p-6">Name(Ar)</th>
                <th className="p-6">Status</th>
                <th className="p-6">Department</th>
                <th className="p-6">Section</th>
                <th className="p-6">Default UoM</th>
                <th className="p-6 rounded-tr-xl">Default barcode</th>
              </tr>
            </thead>
            <tbody className="bg-white [&_tr:last-child]:border-0 ">
              {!itemsList?.length ? (
                <tr className="">
                  <td colSpan={7} className="text-center p-6 ">
                    No data found
                  </td>
                </tr>
              ) : (
                itemsList.map((item) => (
                  <tr
                  key={item.itemCode}
                    onClick={() =>
                      navigate(`/sap/items/details/${item.itemCode}`)
                    }
                    className="text-geantSap-black text-nowrap font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-6 py-3">{item.itemCode}</td>
                    <td className="px-6 py-3">{item.itemName} </td>
                    <td className="px-6 py-3">
                      <StatusBadge  status={item.status}/>
                    </td>
                    <td className="px-6 py-3">{item.department}</td>
                    <td className="px-6 py-3">{item.section} </td>
                    <td className="px-6 py-3">{item.uomCode} </td>
                    <td className="px-6 py-3">{item.barcode} </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="sticky -bottom-1 w-full">
              <tr>
                <td colSpan={7}>
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

export default ItemsTable;
