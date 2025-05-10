import { getMatchingGRPO } from "@/api/client"
import DataRenderer from "@/components/DataRenderer"
import StatusBadge from "@/components/StatusBadge"
import Pagination from "@/components/ui/Pagination"
import Search from "@/components/ui/Search"
import { useStateContext } from "@/context/useStateContext"
import { activeGRPOmenu } from "@/lib/constants"
import { numberWithCommas } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const MatchingTable = () => {
 const navigate = useNavigate();
     const { setError, setTotalPage, totalPage } = useStateContext();
     const [currentPage, setCurrentPage] = useState(1);
   
     const handlePageChange = (page: number) => {
       setCurrentPage(page);
     };
   
     const [search, setSearch] = useState({
       searchKey: activeGRPOmenu[0].value,
       searchValue: "",
     });
     const {
       data: matchingGRPOlist,
       isFetching,
       isError,
     } = useQuery({
       queryKey: ["MatchingCOMGRPO", search, currentPage],
       queryFn: () =>
         getMatchingGRPO(
           `/grpo/commercial/matching?${search.searchKey}=${search.searchValue}&perPage=12&page=${currentPage}`,
           setError,
           setTotalPage
         ),
       refetchOnWindowFocus: false,
       refetchOnMount: true,
     });

  return (
    <div className="space-y-4 h-full ">
    <div className="flex sm:justify-between items-center flex-col sm:flex-row  gap-4">
      <Search menuList={activeGRPOmenu} setSearch={setSearch} search={search} />
    </div>
    <div className="  h-[calc(100dvh-12.75rem)] border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
      <DataRenderer isLoading={isFetching} isError={isError}>
        <table className="w-full caption-bottom ">
          <thead className="sticky top-0 w-full bg-geantSap-gray-25">
            <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
              <th className="p-6 rounded-tl-xl ">Vendor code</th>
              <th className="p-6">Vendor name</th>
              <th className="p-6">Status</th>
              <th className="p-6">Document No.</th>
              <th className="p-6">Vendor invoice NO.</th>
              <th className="p-6">Receiving date</th>
              <th className="p-6 rounded-tr-xl">Document total</th>
            </tr>
          </thead>
          <tbody className="bg-white [&_tr:last-child]:border-0">
            {!matchingGRPOlist?.length ? (
              <tr className="">
                <td colSpan={8} className="text-center p-6">
                  No data found
                </td>
              </tr>
            ) : (
              matchingGRPOlist.map((matchingGRPO) => (
                <tr
                  key={matchingGRPO.documentNumber}
                  onClick={() =>
                    navigate(
                      `/sap/purchasing/matching/details/${matchingGRPO.documentEntry}`
                    )
                  }
                  className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  <td className="px-6 py-3">{matchingGRPO.vendorCode}</td>
                  <td className="px-6 py-3">{matchingGRPO.vendorName}</td>
                  <td className="px-6 py-3">
                    <StatusBadge status={matchingGRPO.status} />
                  </td>
                  <td className="px-6 py-3">{matchingGRPO.documentNumber}</td>
                  <td className="px-6 py-3">{matchingGRPO.invoiceNumber}</td>
                  <td className="px-6 py-3">
                    {matchingGRPO.receivingDate?.split(" ")[0]}
                  </td>
                  <td className="px-6 py-3">
                    {numberWithCommas(matchingGRPO.documentTotal)}
                  </td>
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

export default MatchingTable;
