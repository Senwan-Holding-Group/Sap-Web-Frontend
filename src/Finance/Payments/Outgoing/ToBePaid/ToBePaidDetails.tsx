import { getToBePaidByVendor } from "@/api/client";
import CalculateCreditNote from "@/components/CalculateCreditNote";
import CalculateRebate from "@/components/CalculateRebate";
import CreateOutgoingPayment from "@/components/CreateOutgoingPayment";
import DataRenderer from "@/components/DataRenderer";
import { Label } from "@/components/ui/label";
import { useStateContext } from "@/context/useStateContext";
import { numberWithCommas } from "@/lib/utils";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const ToBePaidDetails = () => {
  const { id, paymentDate } = useParams();
  const { setError } = useStateContext();

  const {
    data: toBePaidDetails,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["toBePaidDetails", id, paymentDate],
    queryFn: () =>
      getToBePaidByVendor(
        `/outgoing-payment/to-paid/${id}?paymentDate=${paymentDate}`,
        setError
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <div className=" sm:h-[35rem] 3xl:h-[47rem] h-[52.5rem] box-border max-h-[52.5rem] overflow-auto  ">
      <div className="bg-white border  border-geantSap-gray-25 geantShadow h-full  rounded-xl flex flex-col justify-between">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <div className="px-6 py-4 flex gap-x-6 items-center border-b border-geantSap-gray-50">
            <Link
              to={"/sap/payments/tobe-paid"}
              className="size-10 border flex items-center   cursor-pointer border-geantSap-gray-100 rounded-lg p-2">
              <FontAwesomeIcon
                className="size-6 text-geantSap-primary-600"
                icon={faChevronLeft}
              />
            </Link>
            <span className="text-lg font-bold  text-geantSap-black">
              {toBePaidDetails?.vendorCode}
            </span>
          </div>
          <div className="flex-1 w-full overflow-scroll py-6 px-4 flex flex-col gap-y-10">
            <div className="flex  min-w-[1288px]">
              <div className="flex w-[26.875rem] flex-col gap-y-6">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  To be Paid Information
                </h1>
                <div className="flex flex-col gap-y-2 mt-2">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Vendor code
                  </Label>
                  <span
                    className={`h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {toBePaidDetails?.vendorCode}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Vendor Name
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {toBePaidDetails?.vendorName}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Payment Type
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {toBePaidDetails?.paymentType}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Bank
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {toBePaidDetails?.bank}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Bank Name
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {toBePaidDetails?.bankName}
                  </span>
                </div>
              </div>
              <div className="flex flex-col rounded-full w-[26.875rem] gap-y-6 ">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  To be paid Information
                </h1>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Bank Account
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {toBePaidDetails?.bankAccount}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Bank Amount
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {numberWithCommas(toBePaidDetails?.bankAmount)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 mt-2">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Payment Amount
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {numberWithCommas(toBePaidDetails?.paymentAmount)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="text-sm font-bold  text-geantSap-black">
                    Cash Amount
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] text-nowrap overflow-x-scroll overflow-y-hidden  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {numberWithCommas(toBePaidDetails?.cashAmount)}
                  </span>
                </div>
               
              </div>
            </div>
          </div>
        </DataRenderer>
        {toBePaidDetails && paymentDate && (
          <div className="flex md:justify-end gap-x-4 p-6 border-t flex-col items-center md:flex-row  gap-y-4 border-geantSap-gray-50">
            <CalculateCreditNote
              disabled={isFetching}
              vendorCode={toBePaidDetails.vendorCode}
              paymentDate={paymentDate}

            />
            <CalculateRebate
              disabled={isFetching}
              vendorCode={toBePaidDetails.vendorCode}
              paymentDate={paymentDate}

            />
            
              <CreateOutgoingPayment
                disabled={isFetching}
                vendorCode={toBePaidDetails.vendorCode}
                paymentDate={paymentDate}
              />
          </div>
        )}
      </div>
    </div>
  );
};

export default ToBePaidDetails;
