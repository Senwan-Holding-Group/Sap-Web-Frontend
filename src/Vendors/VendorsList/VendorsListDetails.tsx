import { getVendorsbyCode } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from "@/context/useStateContext";
import { numberWithCommas } from "@/lib/utils";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import CreateCreditNote from "../CreditNote/CreateCreditNote";

const VendorsListDetails = () => {
  const { id } = useParams();
  const { setError } = useStateContext();
  const {
    data: vendorDetails,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["vendorDetails", id],
    queryFn: () => getVendorsbyCode(`/vendor/${id}`, setError),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <div className=" sm:h-[35rem] 3xl:h-[47rem] h-[52.5rem] box-border max-h-[52.5rem] overflow-auto  ">
      <div className="bg-white border border-geantSap-gray-25 geantShadow h-full rounded-xl flex flex-col justify-between">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <div className="px-6 py-4 flex gap-x-6 items-center border-b border-geantSap-gray-50">
            <Link
              to={"/sap/vendors/vendorsList"}
              className="size-10 border flex items-center   cursor-pointer border-geantSap-gray-100 rounded-lg p-2">
              <FontAwesomeIcon
                className="size-6 text-geantSap-primary-600"
                icon={faChevronLeft}
              />
            </Link>
            <span className="text-lg font-bold  text-geantSap-black">
              {vendorDetails?.vendorCode}
            </span>
          </div>
          <div className="flex-1 w-full overflow-scroll py-6 px-4 flex flex-col gap-y-10">
            <div className="flex  min-w-[1288px]">
              <div className="flex w-[26.875rem] flex-col gap-y-6">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  Vendor Information
                </h1>
                <div className="flex flex-col gap-y-2 mt-2">
                  <Label className="text-sm font-bold text-geantSap-black ">
                    Vendor Code
                  </Label>
                  <span className="h-10 w-[21.188rem] border  border-geantSap-gray-50 p-2 rounded-lg">
                    {vendorDetails?.vendorCode}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Name (Ar)
                  </Label>

                  <span className="h-10 w-[21.188rem] text-nowrap border border-geantSap-gray-50 p-2 rounded-lg">
                    {vendorDetails?.vendorName}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Name (En)
                  </Label>

                  <span className="h-10 w-[21.188rem] text-nowrap border border-geantSap-gray-50 p-2 rounded-lg">
                    {vendorDetails?.vendorNameEN}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-[26.875rem] gap-y-6 ">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  Vendor Information
                </h1>
                <div className="flex flex-col gap-y-2 mt-2">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Status
                  </Label>
                  <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                    {vendorDetails?.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-[26.875rem] gap-y-6 ">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  Administrative data
                </h1>
                <div className="flex gap-x-4 mt-4 items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Created By:</Label>
                  <span id="createdby" className=" text-geantSap-black">
                    {vendorDetails?.administrativeData?.createdBy}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Created On:</Label>
                  <span id="createdon" className=" text-geantSap-black">
                    {vendorDetails &&
                      new Date(
                        vendorDetails?.administrativeData?.createdOn
                      ).toDateString()}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Edited By:</Label>
                  <span id="Editedby" className=" text-geantSap-black">
                    {vendorDetails?.administrativeData?.editedBy}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Edited On:</Label>
                  <span id="Editedon" className=" text-geantSap-black">
                    {vendorDetails &&
                      new Date(
                        vendorDetails?.administrativeData?.editedOn
                      ).toDateString()}
                  </span>
                </div>
              </div>
            </div>
            <Tabs defaultValue="general" className="w-full ">
              <TabsList className="grid w-[35rem] grid-cols-4 ">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="Payment">Payment</TabsTrigger>
                <TabsTrigger value="Slab">Slab</TabsTrigger>
                <TabsTrigger disabled value="Atthachments">
                  Atthachments
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className=" min-w-[1288px] rounded-lg"
                value="general">
                <div className="flex  min-w-[1288px]">
                  <div className="flex w-[26.875rem] flex-col gap-y-6">
                    <div className="flex flex-col gap-y-2 mt-2">
                      <Label className="text-sm font-bold text-geantSap-black ">
                        Company phone number
                      </Label>
                      <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                        {vendorDetails?.general?.companyPhoneNumber}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2 ">
                      <Label className="text-sm font-bold text-geantSap-black">
                        Company email
                      </Label>

                      <span className="h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg">
                        {vendorDetails?.general?.companyEmail}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2 ">
                      <Label className="text-sm font-bold text-geantSap-black">
                        Company address
                      </Label>

                      <span className="h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg">
                        {vendorDetails?.general?.companyAddress}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col w-[26.875rem] gap-y-6 ">
                    <div className="flex flex-col gap-y-2 mt-2">
                      <Label className="text-sm font-bold text-geantSap-black">
                        Contact person ID
                      </Label>
                      <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                        {vendorDetails?.general?.contactPersonId}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2 ">
                      <Label className="text-sm font-bold text-geantSap-black">
                        Contact person name
                      </Label>
                      <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                        {vendorDetails?.general?.contactPersonName}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <Label className="text-sm font-bold text-geantSap-black">
                        Contact person phone number
                      </Label>
                      <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                        {vendorDetails?.general?.contactPersonPhoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                className=" min-w-[1288px] rounded-lg"
                value="Payment">
                <div className="flex  min-w-[1288px]">
                  <div className="flex w-[26.875rem] flex-col gap-y-6">
                    <div className="flex flex-col gap-y-2 mt-2">
                      <Label className="text-sm font-bold text-geantSap-black ">
                        Payment terms
                      </Label>
                      <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                        {vendorDetails?.payments?.["Payment terms"]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2 ">
                      <Label className="text-sm font-bold text-geantSap-black">
                        Purchase order balance
                      </Label>

                      <span className="h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg">
                        {numberWithCommas(
                          vendorDetails?.payments?.["Purchase balance"]
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col w-[26.875rem] gap-y-6 ">
                    <div className="flex flex-col gap-y-2 mt-2">
                      <Label className="text-sm font-bold text-geantSap-black">
                        Account balance
                      </Label>
                      <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                        {numberWithCommas(
                          vendorDetails?.payments?.["Account Balance"]
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2 ">
                      <Label className="text-sm font-bold text-geantSap-black">
                        Goods receipt POs balance
                      </Label>
                      <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                        {numberWithCommas(
                          vendorDetails?.payments?.["Goods receipt POs balance"]
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent className=" min-w-[1288px] rounded-lg" value="Slab">
                <div className="flex  min-w-[1288px]">
                  {vendorDetails &&
                  Object.keys(vendorDetails.rebate).length !== 0 ? (
                    <>
                      <div className="flex flex-col w-[26.875rem] gap-y-6 ">
                        {vendorDetails &&
                          Object.keys(vendorDetails.rebate).map((key) => (
                            <>
                              {key.startsWith("slab") && (
                                <div key={key} className="flex flex-col gap-y-2 mt-2">
                                  <Label className="text-sm font-bold text-geantSap-black">
                                    {key}
                                  </Label>
                                  <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                                    {
                                      vendorDetails.rebate?.[
                                        key as keyof typeof vendorDetails.rebate
                                      ]
                                    }
                                  </span>
                                </div>
                              )}
                            </>
                          ))}
                      </div>
                      <div className="flex w-[26.875rem] flex-col gap-y-6">
                        {vendorDetails &&
                          Object.keys(vendorDetails.rebate).map((key) => (
                            <>
                              {key.startsWith("Target") && (
                                <div key={key} className="flex flex-col gap-y-2 mt-2">
                                  <Label className="text-sm font-bold text-geantSap-black ">
                                    {key}
                                  </Label>

                                  <span className="h-10 w-[21.188rem]  border  border-geantSap-gray-50 p-2 rounded-lg">
                                    {
                                      vendorDetails.rebate?.[
                                        key as keyof typeof vendorDetails.rebate
                                      ]
                                    }
                                  </span>
                                </div>
                              )}
                            </>
                          ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex w-full h-[15rem] justify-center items-center ">
                      No Slabs to show
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DataRenderer>
        <div className="flex justify-end gap-x-4 p-6 border-t borde-geantSap-gray-50">
         <CreateCreditNote vendorDetails={vendorDetails}/>
        </div>
      </div>
    </div>
  );
};

export default VendorsListDetails;
