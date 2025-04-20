import Search from "@/components/ui/Search";
import { useStateContext } from "@/context/useStateContext";
import { transferMenu } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransferRequest from "./TransferRequest";
import DataRenderer from "@/components/DataRenderer";
import StatusBadge from "@/components/StatusBadge";
import Pagination from "@/components/ui/Pagination";
import { getTransferList } from "@/api/client";
import { numberWithCommas } from "@/lib/utils";

const TransferTable = () => {
  const navigate = useNavigate();
  const { setError, setTotalPage, totalPage } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [search, setSearch] = useState({
    searchKey: transferMenu[0].value,
    searchValue: "",
  });
  const {
    data: transferList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["transferList", search, currentPage],
    queryFn: () => getTransferList(`/transferReq/active?${search.searchKey}=${search.searchValue}&perPage=12&page=${currentPage}`, setError, setTotalPage),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex sm:justify-between items-center flex-col sm:flex-row  gap-4">
        <Search menuList={transferMenu} setSearch={setSearch} search={search} />
        <TransferRequest isError={isError} isFetching={isFetching} />
      </div>
      <div className="  3xl:h-[43.5rem] sm:h-[31.5rem] h-[45rem] max-h-[45rem]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <table className="w-full caption-bottom ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                <th className="p-6 rounded-tl-xl">Document No.</th>
                <th className="p-6">Document date</th>
                <th className="p-6">Delivery date</th>
                <th className="p-6">Status</th>
                <th className="p-6">Transfer type</th>
                <th className="p-6 rounded-tr-xl">Document total</th>
              </tr>
            </thead>
            <tbody className="bg-white [&_tr:last-child]:border-0">
              {!transferList?.length ? (
                <tr className="h-[24rem] 3xl:h-[36rem]">
                  <td colSpan={6} className="text-center ">
                    No data found
                  </td>
                </tr>
              ) : (
                transferList.map((doc) => (
                  <tr
                    key={doc.documentNumber}
                    onClick={() =>
                      navigate(
                        `/sap/inventory/transfer/details/${doc.documentEntry}`
                      )
                    }
                    className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-docinter"
                  >
                    <td className="px-6 py-3">{doc.documentNumber}</td>
                    <td className="px-6 py-3">
                      {doc.documentDate.split(" ")[0]}
                    </td>
                    <td className="px-6 py-3">
                      {doc.deliveryDate.split(" ")[0]}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-6 py-3">{doc.transferType}</td>
                    <td className="px-6 py-3">
                      {numberWithCommas(doc.documentTotal)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="sticky -bottom-1 w-full">
              <tr>
                <td colSpan={8}>
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

export default TransferTable;
