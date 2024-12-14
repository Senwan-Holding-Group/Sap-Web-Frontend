import { getActivePObyDocEntry } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from "@/context/useStateContext";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const DraftDetails = () => {
  const { id } = useParams();
  const { setError } = useStateContext();
  const navigate = useNavigate();
  const {
    data: draft,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["draftDetails"],
    queryFn: () => getActivePObyDocEntry(`/po/draft/${id}`, setError),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-white border border-geantSap-gray-25 geantShadow h-[34rem] 3xl:h-[47rem] rounded-xl flex flex-col justify-between">
      <DataRenderer isLoading={isFetching} isError={isError}>
        <div className="px-6 py-4 flex gap-x-6 items-center border-b border-geantSap-gray-50">
          <span
            onClick={() => navigate(-1)}
            className="size-10 border flex items-center   cursor-pointer border-geantSap-gray-100 rounded-lg p-2"
          >
            <FontAwesomeIcon
              className="size-6 text-geantSap-primary-600"
              icon={faChevronLeft}
            />
          </span>
          <span className="text-lg font-bold  text-geantSap-black">
            {draft?.vendorCode}
          </span>
        </div>
        <div className="h-full w-full overflow-scroll py-6 px-4 flex flex-col gap-y-10">
          <div className="flex  min-w-[1288px]">
            <div className="flex w-[26.875rem] flex-col gap-y-6">
              <h1 className="font-bold text-lg text-geantSap-gray-500">
                PO Information
              </h1>
              <div className="flex flex-col gap-y-2 mt-2">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <span className="h-10 w-[21.188rem]  border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.documentNumber}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document date
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.documentDate.split(" ")[0]}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document total
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft&&parseFloat(draft.documentTotal).toFixed(4)}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Vendor Code
                </Label>
                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.vendorCode}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Vendor Name
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.vendorName}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Section
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.section}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Approval status
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.approvalStatus}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Approval remarks
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.remarks}
                </span>
              </div>
            </div>
            <div className="flex flex-col w-[26.875rem] gap-y-6 ">
              <h1 className="font-bold text-lg text-geantSap-gray-500">
                PO Information
              </h1>
              <div className="flex flex-col gap-y-2 mt-2">
                <Label className="text-sm font-bold text-geantSap-black">
                  Status
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.status}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Posting Date
                </Label>
                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.documentDate.split(" ")[0]}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Delivery Date
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.deliveryDate.split(" ")[0]}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Comments
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.comments}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Currency
                </Label>
                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  LYD
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Process Status
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.processStatus}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Approval Key
                </Label>

                <span className="h-10 w-[21.188rem] border border-geantSap-gray-50 p-2 rounded-lg">
                  {draft?.approvalEntry}
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
                  Adam
                </span>
              </div>
              <div className="flex gap-x-4  items-center font-normal text-base">
                <Label className=" text-geantSap-gray-500">Created On:</Label>
                <span id="createdon" className=" text-geantSap-black">
                  12/6/2024, 14:12:00 AM
                </span>
              </div>
              <div className="flex gap-x-4  items-center font-normal text-base">
                <Label className=" text-geantSap-gray-500">Edited By:</Label>
                <span id="Editedby" className=" text-geantSap-black">
                  Adam
                </span>
              </div>
              <div className="flex gap-x-4  items-center font-normal text-base">
                <Label className=" text-geantSap-gray-500">Edited On:</Label>
                <span id="Editedon" className=" text-geantSap-black">
                  12/6/2024, 14:12:00 AM
                </span>
              </div>
            </div>
          </div>
          <Tabs defaultValue="item" className="w-full ">
            <TabsList className="grid w-60 grid-cols-2 ">
              <TabsTrigger value="item">Item</TabsTrigger>
              <TabsTrigger disabled value="attachment">
                Attachment
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className=" min-w-[1288px] border-2 border-geantSap-gray-25 rounded-lg"
              value="item"
            >
              <table className="w-full ">
                <thead className="bg-geantSap-gray-25">
                  <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                    <th className="p-6 rounded-tl-lg ">Item No.</th>
                    <th className="p-6">Item description</th>
                    <th className="p-6">Quantity</th>
                    <th className="p-6">UOM Code</th>
                    <th className="p-6">UOM Group</th>
                    <th className="p-6">Price</th>
                    <th className="p-6">Total (LC)</th>
                    <th className="p-6 rounded-tr-lg">Warehouse code</th>
                  </tr>
                </thead>
                <tbody className=" [&_tr:last-child]:border-0">
                  {draft&&draft.documentLine.map((item) => (
                    <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                      <td className="px-6 py-3">{item.itemCode}</td>
                      <td className="px-6 py-3">{item.itemDescription}</td>
                      <td className="px-6 py-3">{item.quantity}</td>
                      <td className="px-6 py-3">{item.uomCode}</td>
                      <td className="px-6 py-3">{item.uomGroup}</td>
                      <td className="px-6 py-3">{item.price} LYD</td>
                      <td className="px-6 py-3">{item.total} LYD</td>
                      <td className="px-6 py-3">{item.warehouseCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent
              className=" min-w-[1288px] border-2 border-geantSap-gray-25 rounded-lg"
              value="attachment"
            >
              <table className="w-full ">
                <thead className="bg-geantSap-gray-25">
                  <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                    <th className="p-6 rounded-tl-lg ">#</th>
                    <th className="p-6">File path</th>
                    <th className="p-6">File name</th>
                    <th className="p-6 rounded-tr-lg">Attaching date</th>
                  </tr>
                </thead>
                <tbody className=" [&_tr:last-child]:border-0">
                  <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                    <td className="px-6 py-3">1</td>
                    <td className="px-6 py-3">
                      C:/Program files/SAP Business One/ Attachment
                    </td>
                    <td className="px-6 py-3">Invoice </td>

                    <td className="px-6 py-3">Mar 31,2025 </td>
                  </tr>
                  <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                    <td className="px-6 py-3">2</td>
                    <td className="px-6 py-3">
                      C:/Program files/SAP Business One/ Attachment
                    </td>
                    <td className="px-6 py-3">Sales </td>

                    <td className="px-6 py-3">Mar 31,2025 </td>
                  </tr>
                  <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                    <td className="px-6 py-3">3</td>
                    <td className="px-6 py-3">
                      C:/Program files/SAP Business One/ Attachment
                    </td>
                    <td className="px-6 py-3">Invoice 2 </td>

                    <td className="px-6 py-3">Mar 31,2025 </td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </div>
      </DataRenderer>
      <div className="flex justify-end gap-x-4 p-6 border-t borde-geantSap-gray-50">
        <Button className="bg-transparent text-geantSap-primary-600 border border-geantSap-gray-100 rounded-lg">
          Add
        </Button>
        <Button className="bg-geantSap-primary-500  rounded-lg">Edit</Button>
      </div>
    </div>
  );
};

export default DraftDetails;
