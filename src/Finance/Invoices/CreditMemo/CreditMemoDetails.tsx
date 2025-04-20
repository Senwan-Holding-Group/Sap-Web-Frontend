import { getActiveAPbyDocEntry } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import SelectLayout from "@/components/SelectLayout";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from "@/context/useStateContext";
import { numberWithCommas } from "@/lib/utils";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
const CreditMemoDetails = () => {
   const { id } = useParams();
    const { setError } = useStateContext();
  
    const {
      data: activeCreditMemo,
      isFetching,
      isError,
    } = useQuery({
      queryKey: ["activeCredit-memoDetails", id],
      queryFn: () => getActiveAPbyDocEntry(`/credit-memo/active/${id}`, setError),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    });
  
  return (
    <div className=" sm:h-[35rem] 3xl:h-[47rem] h-[52.5rem] box-border max-h-[52.5rem] overflow-auto  ">
    <div className="bg-white border  border-geantSap-gray-25 geantShadow h-full  rounded-xl flex flex-col justify-between">
      <DataRenderer isLoading={isFetching} isError={isError}>
        <div className="px-6 py-4 flex gap-x-6 items-center border-b border-geantSap-gray-50">
          <Link
            to={"/sap/invoices/credit-memo"}
            className="size-10 border flex items-center   cursor-pointer border-geantSap-gray-100 rounded-lg p-2">
            <FontAwesomeIcon
              className="size-6 text-geantSap-primary-600"
              icon={faChevronLeft}
            />
          </Link>
          <span className="text-lg font-bold  text-geantSap-black">
            {activeCreditMemo?.vendorCode}
          </span>
        </div>
        <div className="flex-1 w-full overflow-scroll py-6 px-4 flex flex-col gap-y-10">
          <div className="flex  min-w-[1288px]">
            <div className="flex w-[26.875rem] flex-col gap-y-6">
              <h1 className="font-bold text-lg text-geantSap-gray-500">
                Credit Memo Information
              </h1>
              <div className="flex flex-col gap-y-2 mt-2">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <span
                  className={`h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.documentNumber}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document date
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.documentDate?.split(" ")[0]}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document total
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo && numberWithCommas(activeCreditMemo.documentTotal)}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Vendor Code
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.vendorCode}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Vendor Name
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.vendorName}
                </span>
              </div>

              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Section
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.section}
                </span>
              </div>
            </div>
            <div className="flex flex-col rounded-full w-[26.875rem] gap-y-6 ">
              <h1 className="font-bold text-lg text-geantSap-gray-500">
                Credit Memo Information
              </h1>
              <div className="flex flex-col gap-y-2 mt-2">
                <Label className="text-sm font-bold text-geantSap-black">
                  Status
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.status}
                </span>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label className="text-sm font-bold text-geantSap-black">
                  Vendor invoice NO.
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.invoiceNumber}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Due  date
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.dueDate?.split(" ")[0]}
                </span>
              </div>

              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Currency
                </Label>
                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  LYD
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Comments
                </Label>

                <span
                  className={`h-10 w-[21.188rem] text-nowrap overflow-x-scroll  border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.comments}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Process Status
                </Label>

                <span
                  className={`h-10 w-[21.188rem]   border border-geantSap-gray-50 p-2 rounded-lg`}>
                  {activeCreditMemo?.processStatus}
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
                  {activeCreditMemo?.administrativeData?.createdBy}
                </span>
              </div>
              <div className="flex gap-x-4  items-center font-normal text-base">
                <Label className=" text-geantSap-gray-500">Created On:</Label>
                <span id="createdon" className=" text-geantSap-black">
                  {activeCreditMemo &&
                    new Date(
                      activeCreditMemo?.administrativeData?.createdOn
                    ).toDateString()}
                </span>
              </div>
              <div className="flex gap-x-4  items-center font-normal text-base">
                <Label className=" text-geantSap-gray-500">Edited By:</Label>
                <span id="Editedby" className=" text-geantSap-black">
                  {activeCreditMemo?.administrativeData?.editedBy}
                </span>
              </div>
              <div className="flex gap-x-4  items-center font-normal text-base">
                <Label className=" text-geantSap-gray-500">Edited On:</Label>
                <span id="Editedon" className=" text-geantSap-black">
                  {activeCreditMemo &&
                    new Date(
                      activeCreditMemo?.administrativeData?.editedOn
                    ).toDateString()}
                </span>
              </div>
            </div>
          </div>
          <Tabs defaultValue="item" className="min-w-max  ">
            <TabsList className="grid w-60 grid-cols-2 ">
              <TabsTrigger value="item">Item</TabsTrigger>
            </TabsList>
            <TabsContent
              className=" w-full border-2  border-geantSap-gray-25 rounded-lg"
              value="item">
              <table className="w-full text-nowrap ">
                <thead className="bg-geantSap-gray-25">
                  <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                    <th className="p-6 rounded-tl-lg ">Item No.</th>
                    <th className="p-6">Item description</th>
                    <th className="p-6">Price</th>
                    <th className="p-6">Quantity</th>
                    <th className="p-6">UOM Code</th>
                    <th className="p-6 ">UOM Group</th>
                    <th className="p-6 "> Warehouse</th>
                    <th className="p-6  rounded-tr-lg"> Total line</th>
                  </tr>
                </thead>
                <tbody className=" [&_tr:last-child]:border-0">
                  {activeCreditMemo?.documentLine.map((item, i) => (
                    <tr
                      key={i}
                      className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                      <td className="px-6 py-3">{item.itemCode}</td>
                      <td className="px-6 py-3">{item.itemDescription}</td>
                      <td className="px-6 py-3">
                        {numberWithCommas(item.price)}
                        LYD
                      </td>
                      <td className="px-6 py-3">{item.quantity}</td>
                      <td className="px-6 py-3">{item.uomCode}</td>
                      <td className="px-6 py-3">{item.uomGroup}</td>
                      <td className="px-6 py-3">{item.warehouseCode}</td>
                      <td className="px-6 py-3">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </div>
      </DataRenderer>
      <div className="flex justify-end gap-x-4 p-6 border-t borde-geantSap-gray-50">
      <SelectLayout title="Save Credit Memo as" disabled={isFetching} />

      </div>
    </div>
  </div>  )
}

export default CreditMemoDetails