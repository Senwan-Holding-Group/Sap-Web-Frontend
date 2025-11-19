import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { getCreditNoteByVendorCode, postCreditNote } from "@/api/client";
import { useStateContext } from "@/context/useStateContext";
import DataRenderer from "../../../../../components/DataRenderer";
import { numberWithCommas } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";
type Props = {
  disabled: boolean;
  vendorCode: string;
  paymentDate: string;
};
const CalculateCreditNote = ({ disabled, vendorCode, paymentDate }: Props) => {
  const { setError } = useStateContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setisSubmitting] = useState(false);

  const {
    data: creditNote,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["creditNote", vendorCode],
    queryFn: () =>
      getCreditNoteByVendorCode(
        `/outgoing-payment/creditNote/${vendorCode}?paymentDate=${paymentDate}`,
        setError
      ),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!vendorCode,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          type="button"
          className="bg-transparent text-geantSap-primary-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
          Calculate credit note
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className=" flex flex-col justify-between 3xl:h-[35rem]  sm:max-w-2xl w-[90%] ">
        <div className="p-4 ">
          <DialogHeader className="border-b  border-geantSap-gray-50  md:h-[3.5rem]">
            <DialogTitle className=" flex md:flex-row flex-col  justify-between items-center  py-2 pl-2  pr-4">
              <span className="text-2xl leading-9 font-bold text-geantSap-primary-500">
                Calculate credit note
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className=" px-4 space-y-8  pt-8 pb-4 h-full w-full  ">
          <DataRenderer isLoading={isFetching} isError={isError}>
            <div className="border-2 h-[20rem] bg-white border-geantSap-gray-25 rounded-xl overflow-scroll">
              <table className="w-full caption-bottom ">
                <thead className="sticky top-0 w-full bg-geantSap-gray-25">
                  <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                    <th className="p-6 rounded-tl-xl ">Credit Note Type</th>

                    <th className="p-6 rounded-tr-xl">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white [&_tr:last-child]:border-0">
                  {!creditNote?.length ? (
                    <tr className="">
                      <td colSpan={2} className="text-center p-6 ">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    creditNote.map((data, i) => (
                      <tr
                        key={i}
                        className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                        <td className="px-6 py-3">{data.type}</td>
                        <td className="px-6 py-3">
                          {numberWithCommas(data.totalAmount)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </DataRenderer>
          <div className="p-4 border-t  flex gap-4 justify-end items-center border-geantSap-gray-50  ">
            <span className="text-lg font-normal text-geantSap-gray-500">
              Total amount:
            </span>
            <span>
              <span className="font-bold text-2xl text-geantSap-black">
                {creditNote&&numberWithCommas(
                  creditNote.reduce((sum, item) => sum + Number(item.totalAmount), 0)
                )}
              </span>{" "}
              LYD
            </span>
          </div>
        </div>
        <DialogFooter className=" bg-[#fcfcfc] rounded-bl-lg p-6  rounded-br-lg  border-t flex flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
          <DialogClose asChild>
            <Button
              onClick={() => {}}
              className="bg-white w-[8.125rem] border rounded-lg text-geantSap-primary-600 font-medium text-base"
              type="button">
              Close
            </Button>
          </DialogClose>
          <Button
            className="bg-geantSap-primary-500 w-[8.125rem] disabled:opacity-50 rounded-lg font-medium text-base"
            onClick={() => {
              postCreditNote(
                `/outgoing-payment/creditNote/${vendorCode}?paymentDate=${paymentDate}`,
                setisSubmitting,
                toast,
                queryClient
              );
            }}
            disabled={isSubmitting || !creditNote?.length}>
            {isSubmitting && (
              <FontAwesomeIcon className="" icon={faSpinner} spin />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalculateCreditNote;
