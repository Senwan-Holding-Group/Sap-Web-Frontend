import { getInventoryMissingQuantity } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { useStateContext } from "@/context/useStateContext";
import { inventoryMissingQTYmenu } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InventorMissingQtyTable = () => {
  const navigate = useNavigate();
  const { setError, setTotalPage, totalPage } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [search, setSearch] = useState({
    searchKey: inventoryMissingQTYmenu[0].value,
    searchValue: "",
  });
  const {
    data: inventoryMissingQtyList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["inventoryMissingQtyList", search, currentPage],
    queryFn: () =>
      getInventoryMissingQuantity(
        `/transferReq/missing?${search.searchKey}=${search.searchValue}&perPage=12&page=${currentPage}`,
        setError,
        setTotalPage
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex sm:justify-between items-center flex-col sm:flex-row  gap-4">
        <Search
          menuList={inventoryMissingQTYmenu}
          setSearch={setSearch}
          search={search}
        />
      </div>
      <div className=" 3xl:h-[43.5rem] sm:h-[31.5rem] h-[48.5rem] max-h-[48.5rem]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <table className="w-full caption-bottom ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                <th className="p-6 rounded-tl-xl">Document No.</th>

                <th className="p-6">Delivery date</th>
                <th className="p-6">Transfer type</th>
                <th className="p-6"> Requested value </th>
                <th className="p-6"> Received value </th>
                <th className="p-6 rounded-tr-xl">Difference</th>
              </tr>
            </thead>
            <tbody className="bg-white [&_tr:last-child]:border-0 ">
              {!inventoryMissingQtyList?.length ? (
                <tr className="h-[24rem] 3xl:h-[36rem]">
                  <td colSpan={6} className="text-center ">
                    No data found
                  </td>
                </tr>
              ) : (
                inventoryMissingQtyList.map((missing, i) => (
                  <tr
                    key={i}
                    onClick={() =>
                      navigate(
                        `/sap/inventory/missing-qty/details/${missing.documentEntry}`
                      )
                    }
                    className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-6 py-3">{missing.documentNumber}</td>
                    <td className="px-6 py-3">
                      {missing.deliveryDate.split(" ")[0]}
                    </td>
                    <td className="px-6 py-3">{missing.transferType}</td>
                    <td className="px-6 py-3">
                      {parseFloat(missing.documentTotal).toFixed(4)}
                    </td>
                    <td className="px-6 py-3">
                      {parseFloat(missing.trValue).toFixed(4)}
                    </td>
                    <td className="px-6 py-3 ">
                      <span className=" bg-geantSap-error-50 text-geantSap-error-500 hover:bg-geantSap-error-100 px-3  py-1 rounded-[40px] text-sm font-normalleading-[21px] inline-block  transition-colors duration-200 cursor-default">
                        {parseFloat(missing.difference).toFixed(4)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="sticky h-10 -bottom-1 w-full">
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

export default InventorMissingQtyTable;