/* eslint-disable @typescript-eslint/no-explicit-any */
import { getReports } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import FiltersForm from "@/components/forms/FiltersForm";
import Pagination from "@/components/ui/Pagination";
import { useStateContext } from "@/context/useStateContext";
import { capitalize, numberWithCommas } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {  useState } from "react";

const ReportsTable = () => {
  const [query, setquery] = useState<string>("");
  const { setError, setTotalPage, totalPage } = useStateContext();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const {
    data: reportList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["reportList", query, currentPage],
    queryFn: () =>
      getReports(
        `/report/view?filter=${query}&perPage=100&page=${currentPage}`,
        setError,
        setTotalPage
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: query != "",
  });

  return (
    <div className="space-y-4 h-full ">
      <FiltersForm setquery={setquery} query={query} />
      <div className="   sm:h-[calc(100dvh-11.5rem)] h-[calc(100dvh-24rem)]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        {query != "" ? (
          <DataRenderer isLoading={isFetching} isError={isError}>
            {reportList && reportList.length > 0 ? (
              <table className="w-full caption-bottom">
                <thead className="sticky top-0 w-full bg-geantSap-gray-25">
                  <tr className="text-nowrap text-base text-left font-bold text-geantSap-gray-600">
                    {Object.keys(reportList[0]).map((key, i) => (
                      <th key={i} className="p-6 first:rounded-tl-xl">
                        {capitalize(key)
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white [&_tr:last-child]:border-0">
                  {reportList.map((report: any, i: number) => (
                    <tr
                      key={i}
                      className="text-geantSap-black text-nowrap font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                    >
                      {Object.values(report).map((value: any, i: number) => {
                        const currentKey = Object.keys(report)[i];
                        return (
                              <td key={i} className="px-6 py-3">
                                {currentKey === "itemCode"
                                  ? value
                                  : numberWithCommas(value)}
                              </td>
                        );
                      })}
                    </tr>
                 
                  ))}
                </tbody>
                <tfoot className="sticky -bottom-1 w-full">
                  <tr>
                    <td colSpan={Object.keys(reportList[0]).length}>
                      <Pagination
                        totalPages={totalPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <div className="w-full h-[84.5%]">
                <div className="h-[4.5rem] bg-geantSap-gray-25 rounded-tl-xl rounded-tr-xl"></div>
                <div className="flex items-center justify-center h-full">
                  No data available
                </div>
                <div className="h-10 bg-geantSap-gray-25 rounded-bl-xl rounded-br-xl"></div>
              </div>
            )}
          </DataRenderer>
        ) : (
          <div className="w-full  ">
            <div className="h-10 bg-geantSap-gray-25 rounded-tl-xl rounded-tr-xl"></div>
            <div className="flex p-6 items-center justify-center h-full">
              Select report type and period to view the data
            </div>
            <div className="h-10 bg-geantSap-gray-25 rounded-bl-xl rounded-br-xl"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ReportsTable;
