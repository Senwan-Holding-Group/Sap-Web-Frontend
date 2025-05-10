import { getToBePaid } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Pagination from "@/components/ui/Pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Search from "@/components/ui/Search";
import { useStateContext } from "@/context/useStateContext";
import { toBePaidMenu } from "@/lib/constants";
import { cn, numberWithCommas } from "@/lib/utils";
import { faCalendarCirclePlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CompletedPtsTable = () => {
    const navigate = useNavigate();
    const { setError, setTotalPage, totalPage } = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentDate, setpaymentDate] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    const handleDateSelect = (date: Date | undefined) => {
      if (date) {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setSelectedDate(date);
        setpaymentDate(`&paymentDate=${formattedDate}`);
      } else {
          setpaymentDate('');
        setSelectedDate(undefined);
      }
    };
    const [search, setSearch] = useState({
      searchKey: toBePaidMenu[0].value,
      searchValue: "",
    });
    const {
      data: toBePaidList,
      isFetching,
      isError,
    } = useQuery({
      queryKey: ["toBePaid", search, currentPage, paymentDate],
      queryFn: () =>
        getToBePaid(
          `/outgoing-payment/to-paid?${search.searchKey}=${search.searchValue}${paymentDate}&perPage=12&page=${currentPage}`,
          setError,
          setTotalPage
        ),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled:paymentDate!=""
    });
  return (
    <div className="space-y-4 h-full ">
    <div className="flex md:flex-row flex-col  gap-2 ">
      <Search menuList={toBePaidMenu} setSearch={setSearch} search={search} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "max-w-md w-[23.75rem] pl-3 text-left  font-normal",
              !selectedDate && "text-muted-foreground"
            )}>
            {selectedDate ? (
              format(new Date(selectedDate), "PP")
            ) : (
              <span>Pick a date</span>
            )}
            <FontAwesomeIcon
              icon={faCalendarCirclePlus}
              className=" text-geantSap-primary-600 h-6 w-6 "
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 " align="start">
          <Calendar
            selected={selectedDate}
            mode="single"
            onSelect={(date) =>
              handleDateSelect(date ? new Date(date) : undefined)
            }
            disabled={(date) => {
              const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
              
              const isMiddleOrEndDay = date.getDate() === 15 || date.getDate() === lastDay;
              
              return (
                
                date < new Date("1900-01-01") || 
                !isMiddleOrEndDay 
              );
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
    <div className="sm:h-[calc(100dvh-12.75rem)]  h-[calc(100dvh-15.75rem)]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
      <DataRenderer isLoading={isFetching} isError={isError}>
        <table className="w-full caption-bottom ">
          <thead className="sticky top-0 w-full bg-geantSap-gray-25">
            <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
              <th className="p-6 rounded-tl-xl ">Vendor code</th>
              <th className="p-6">Name (AR)</th>
              <th className="p-6">Payment Balance</th>
              <th className="p-6 rounded-tr-xl">Payment Type</th>
            </tr>
          </thead>
          <tbody className="bg-white [&_tr:last-child]:border-0">
            {!toBePaidList?.length ? (
              <tr className="">
                <td colSpan={4} className="text-center p-6 ">
                  No data found
                </td>
              </tr>
            ) : (
              toBePaidList.map((data) => (
                <tr
                  key={data.vendorCode}
                  onClick={() =>
                    navigate(
                      `/sap/payments/completed-payments/details/${data.vendorCode}/${selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}`
                    )
                  }
                  className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                  <td className="px-6 py-3">{data.vendorCode}</td>
                  <td className="px-6 py-3">{data.vendorName}</td>

                  <td className="px-6 py-3">
                    {numberWithCommas(data.paymentAmount)}
                  </td>
                  <td className="px-6 py-3">{data.paymentType}</td>
                </tr>
              ))
            )}
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
  )
}

export default CompletedPtsTable