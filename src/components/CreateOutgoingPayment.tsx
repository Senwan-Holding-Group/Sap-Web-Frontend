import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { getToBePaidDocByvendor } from "@/api/client";
import { useStateContext } from "@/context/useStateContext";
import DataRenderer from "./DataRenderer";
import { numberWithCommas } from "@/lib/utils";
import OutgoingPayments from "./OutgoingPayments";
type Props = {
  disabled: boolean;
  vendorCode: string;
  paymentDate: string;
};
const CreateOutgoingPayment = ({
  disabled,
  vendorCode,
  paymentDate,
}: Props) => {
  const { setError } = useStateContext();

  const {
    data: outgoingPaymentList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["outgoingPaymentList", vendorCode, paymentDate],
    queryFn: () =>
      getToBePaidDocByvendor(
        `/outgoing-payment/to-paid/${vendorCode}/documents?paymentDate=${paymentDate}`,
        setError
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!vendorCode && !!paymentDate,
  });
  const totalAmount =
    outgoingPaymentList &&
    outgoingPaymentList.result
      ?.filter((item) => item && item.documentTotal != null)
      .reduce((sum, item) => sum + Number(item.documentTotal), 0);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          type="button"
          className="bg-geantSap-primary-600  text-white border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
          Create Payment
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className=" flex flex-col justify-between 3xl:h-[40rem]  sm:max-w-7xl w-[90%] ">
        <div className="px-4 ">
          <DialogHeader className="border-b  border-geantSap-gray-50  md:h-[3.5rem]">
            <DialogTitle className=" flex md:flex-row flex-col  justify-between items-center  py-2 pl-2  pr-4">
              <span className="text-2xl leading-9 font-bold text-geantSap-primary-500">
                Create Outgoing Payment
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className=" px-4 space-y-8  pt-8 pb-4 h-full w-full ">
          <DataRenderer isLoading={isFetching} isError={isError}>
            <div className="border-2 h-[25rem]  bg-white border-geantSap-gray-25 rounded-xl overflow-scroll">
              <table className="w-full caption-bottom ">
                <thead className="sticky top-0 w-full bg-geantSap-gray-25">
                  <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                    <th className="p-6 rounded-tl-xl ">Type</th>
                    <th className="p-6 ">Date</th>
                    <th className="p-6 ">DocNum</th>
                    <th className="p-6 ">Vendor invoice No.</th>
                    <th className="p-6 ">Document Total</th>

                    <th className="p-6 rounded-tr-xl">Remark</th>
                  </tr>
                </thead>
                <tbody className="bg-white [&_tr:last-child]:border-0">
                  {!outgoingPaymentList?.result?.length ? (
                    <tr className="">
                      <td colSpan={6} className="text-center p-6">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    outgoingPaymentList.result.map((data, i) => (
                      <tr
                        key={i}
                        className="text-nowrap text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                        <td className="px-6 py-3">{data.documentType}</td>
                        <td className="px-6 py-3">
                          {data.documentDate.split(" ")[0]}
                        </td>
                        <td className="px-6 py-3">{data.docmentNumber}</td>

                        <td className="px-6 py-3">{data.vendorRef}</td>
                        <td className="px-6 py-3">
                          {numberWithCommas(data.documentTotal)}
                        </td>
                        <td className="px-6 py-3 text-nowrap">{data.remark}</td>
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
                {numberWithCommas(totalAmount)}
              </span>{" "}
              LYD
            </span>
          </div>
        </div>
        <DialogFooter className=" bg-[#fcfcfc] rounded-bl-lg p-6  rounded-br-lg  border-t flex flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
          <DialogClose asChild>
            <Button
              className="bg-white w-[8.125rem] border rounded-lg text-geantSap-primary-600 font-medium text-base"
              type="button">
              Close
            </Button>
          </DialogClose>
              <OutgoingPayments disable={isFetching} outgoingPaymentList={outgoingPaymentList} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOutgoingPayment;
