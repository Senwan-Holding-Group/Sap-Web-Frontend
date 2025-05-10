import { cancelCreditNote, getcreditNoteByDocEntry } from "@/api/client";
import CancelPOAlert from "@/components/CancelPOAlert";
import DataRenderer from "@/components/DataRenderer";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from "@/context/useStateContext";
import { useToast } from "@/lib/hooks/use-toast";
import { CreditNoteList } from "@/lib/types";
import { capitalize, numberWithCommas } from "@/lib/utils";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreditNoteDetails = () => {
  const { id } = useParams();
  const { setError } = useStateContext();
  const [isSubmitting, setisSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    data: creditNoteDetails,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["creditNoteDetails", id],
    queryFn: () => getcreditNoteByDocEntry(`/credit-note/${id}`, setError),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  const handleCancelCreditNote = () => {
    if (creditNoteDetails) {
      cancelCreditNote(
        creditNoteDetails.documentEntry,
        navigate,
        toast,
        setisSubmitting
      );
    }
  };
  return (
    <div className=" h-[calc(100dvh-9.25rem)]  box-border  overflow-auto  ">
      <Loader enable={isSubmitting} />

      <div className="bg-white border  border-geantSap-gray-25 geantShadow h-full  rounded-xl flex flex-col justify-between">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <div className="px-6 py-4 flex gap-x-6 items-center border-b border-geantSap-gray-50">
            <Link
              to={"/sap/vendors/creditNoteList"}
              className="size-10 border flex items-center   cursor-pointer border-geantSap-gray-100 rounded-lg p-2">
              <FontAwesomeIcon
                className="size-6 text-geantSap-primary-600"
                icon={faChevronLeft}
              />
            </Link>
            <span className="text-lg font-bold  text-geantSap-black">
              {creditNoteDetails?.vendorCode}
            </span>
          </div>
          <div className="flex-1 w-full overflow-scroll py-6 px-4 flex flex-col gap-y-10">
            <div className="flex  min-w-[1288px]">
              <div className="flex w-[26.875rem] flex-col gap-y-6">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  Credit Note Information
                </h1>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Vendor Code
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {creditNoteDetails?.vendorCode}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Vendor Name
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] text-nowrap overflow-x-scroll overflow-y-hidden border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {creditNoteDetails?.vendorName}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Document date
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {creditNoteDetails?.documentDate?.split(" ")[0]}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Document total
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {creditNoteDetails &&
                      numberWithCommas(creditNoteDetails.documentTotal)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Status
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {creditNoteDetails?.status}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Currency
                  </Label>
                  <span
                    className={`h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    LYD
                  </span>
                </div>
              </div>
              <div className="flex flex-col rounded-full w-[26.875rem] gap-y-6 ">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  Credit Note Information
                </h1>
                {creditNoteDetails &&
                  Object.keys(creditNoteDetails.creditNoteList[0])
                    .filter(
                      (key) =>
                        creditNoteDetails.creditNoteList[0][
                          key as keyof CreditNoteList
                        ] !== 0
                    )
                    .map((key, index) => (
                      <div key={index} className="flex flex-col gap-y-2 ">
                        <Label className="text-sm font-bold text-geantSap-black">
                          {capitalize(key)
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        </Label>
                        <span
                          className={`h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg`}>
                          {
                            creditNoteDetails.creditNoteList[0][
                              key as keyof CreditNoteList
                            ]
                          }
                        </span>
                      </div>
                    ))}
              </div>
              <div className="flex flex-col w-[26.875rem] gap-y-6 ">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  Administrative data
                </h1>
                <div className="flex gap-x-4 mt-4 items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Created By:</Label>
                  <span id="createdby" className=" text-geantSap-black">
                    {creditNoteDetails?.administrativeData?.createdBy}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Created On:</Label>
                  <span id="createdon" className=" text-geantSap-black">
                    {creditNoteDetails &&
                      new Date(
                        creditNoteDetails?.administrativeData?.createdOn
                      ).toDateString()}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Edited By:</Label>
                  <span id="Editedby" className=" text-geantSap-black">
                    {creditNoteDetails?.administrativeData?.editedBy}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Edited On:</Label>
                  <span id="Editedon" className=" text-geantSap-black">
                    {creditNoteDetails &&
                      new Date(
                        creditNoteDetails?.administrativeData?.editedOn
                      ).toDateString()}
                  </span>
                </div>
              </div>
            </div>
            <Tabs defaultValue="Attachment" className="min-w-max  ">
              <TabsList className="grid w-60 grid-cols-2 ">
                <TabsTrigger disabled value="Attachment">
                  Attachment
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className="hidden w-full border-2  border-geantSap-gray-25 rounded-lg"
                value="Attachment"></TabsContent>
            </Tabs>
          </div>
        </DataRenderer>
        <div className="flex justify-end gap-x-4 p-6 border-t borde-geantSap-gray-50">
          <CancelPOAlert
            disabled={creditNoteDetails?.status === "Cancelled" || isFetching}
            title="Cancel Credit note"
            description="Are you sure you want to cancel this credit note?"
            cancel={handleCancelCreditNote}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditNoteDetails;
