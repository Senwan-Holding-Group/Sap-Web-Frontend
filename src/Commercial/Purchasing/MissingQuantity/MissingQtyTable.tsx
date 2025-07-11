import { getMissingQuantity } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { useStateContext } from "@/context/useStateContext";
import { missingQTYmenu } from "@/lib/constants";
import { numberWithCommas } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MissingQtyTable = () => {
  const navigate = useNavigate();
  const { setError, setTotalPage, totalPage } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [search, setSearch] = useState({
    searchKey: missingQTYmenu[0].value,
    searchValue: "",
  });
  const {
    data: missingQtyList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["missingQTY", search, currentPage],
    queryFn: () =>
      getMissingQuantity(
        `/po/missing?${search.searchKey}=${search.searchValue}&perPage=15&page=${currentPage}`,
        setError,
        setTotalPage
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <div className="space-y-4 h-full ">
      <div className="flex sm:justify-between items-center flex-col sm:flex-row  gap-4">
        <Search
          menuList={missingQTYmenu}
          setSearch={setSearch}
          search={search}
        />
      </div>
      <div className=" h-[calc(100dvh-12.75rem)]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <table className="w-full caption-bottom ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                <th className="p-6 rounded-tl-xl">Document No.</th>
                <th className="p-6  ">Vendor code</th>
                <th className="p-6">Vendor name</th>
                <th className="p-6">Delivery date</th>
                <th className="p-6">PO value</th>
                <th className="p-6"> GR value</th>
                <th className="p-6 rounded-tr-xl">Difference</th>
              </tr>
            </thead>
            <tbody className="bg-white [&_tr:last-child]:border-0 ">
              {!missingQtyList?.length ? (
                <tr className="">
                  <td colSpan={7} className="text-center p-6 ">
                    No data found
                  </td>
                </tr>
              ) : (
                missingQtyList.map((missing, i) => (
                  <tr
                    key={i}
                    onClick={() =>
                      navigate(
                        `/sap/purchasing/missing-qty/details/${missing.documentEntry}`
                      )
                    }
                    className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-6 py-3">{missing.documentNumber}</td>
                    <td className="px-6 py-3">{missing.vendorCode}</td>
                    <td className="px-6 py-3">{missing.vendorName}</td>
                    <td className="px-6 py-3">
                      {missing.deliveryDate?.split(" ")[0]}
                    </td>
                    <td className="px-6 py-3">
                      {numberWithCommas(missing.documentTotal)}
                    </td>
                    <td className="px-6 py-3">
                      {numberWithCommas(missing.grValue)}
                    </td>
                    <td className="px-6 py-3 ">
                      <span
                        className=" bg-geantSap-error-50 text-geantSap-error-500 hover:bg-geantSap-error-100 px-3  py-1 rounded-[40px] text-sm font-normalleading-[21px] inline-block  transition-colors duration-200 cursor-default"
                      >
                        {numberWithCommas(missing.difference)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="sticky h-10 -bottom-1 w-full">
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

export default MissingQtyTable;
