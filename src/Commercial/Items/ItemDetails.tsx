import { getItemByCode } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStateContext } from "@/context/useStateContext";
import { Item } from "@/lib/types";
import { capitalize, numberWithCommas } from "@/lib/utils";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const { setError } = useStateContext();
  const {
    data: itemDetails,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["itemDetails",id],
    queryFn: () => getItemByCode(`/item/${id}`, setError),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <div className=" h-[calc(100dvh-9.25rem)] box-border  overflow-auto  ">
      <div className="bg-white border border-geantSap-gray-25 geantShadow h-full rounded-xl flex flex-col justify-between">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <div className="px-6 py-4 flex gap-x-6 items-center border-b border-geantSap-gray-50">
            <Link
              to={"/sap/items"}
              className="size-10 border flex items-center   cursor-pointer border-geantSap-gray-100 rounded-lg p-2"
            >
              <FontAwesomeIcon
                className="size-6 text-geantSap-primary-600"
                icon={faChevronLeft}
              />
            </Link>
            <span className="text-lg font-bold  text-geantSap-black">
              {itemDetails?.itemCode}
            </span>
          </div>
          <div className="flex-1 w-full overflow-scroll py-6 px-4 flex flex-col gap-y-10">
            <div className="flex  min-w-[1288px]">
              <div className="flex w-[26.875rem] flex-col gap-y-6">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  Item Information
                </h1>
                {itemDetails &&
                  Object.keys(itemDetails)
                    .slice(0, 7)
                    .map((key) => (
                      <div key={key} className="flex flex-col gap-y-2 first:mt-2">
                        <Label className="text-sm font-bold text-geantSap-black ">
                          {capitalize(key)
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        </Label>
                        <span className="h-10 w-[21.188rem] border text-nowrap overflow-x-scroll  border-geantSap-gray-50 p-2 rounded-lg">
                          {itemDetails[key as keyof Item] === null
                            ? ""
                            : String(itemDetails[key as keyof Item])}
                        </span>
                      </div>
                    ))}
              </div>
              <div className="flex flex-col w-[26.875rem] gap-y-6 ">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  Item Information
                </h1>
                {itemDetails &&
                  Object.keys(itemDetails)
                    .slice(7, 14)
                    .map((key) => (
                      <div
                        key={key}
                        className="flex flex-col gap-y-2 first:mt-2"
                      >
                        <Label className="text-sm font-bold text-geantSap-black ">
                          {capitalize(key)
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        </Label>

                        <span
                          key={key}
                          className="h-10 w-[21.188rem] border  border-geantSap-gray-50 p-2 rounded-lg"
                        >
                          {itemDetails[key as keyof Item] === null
                            ? ""
                            : String(itemDetails[key as keyof Item])}
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
                    {itemDetails?.administrativeData?.createdBy}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Created On:</Label>
                  <span id="createdon" className=" text-geantSap-black">
                    {itemDetails &&
                      new Date(
                        itemDetails?.administrativeData?.createdOn
                      ).toDateString()}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Edited By:</Label>
                  <span id="Editedby" className=" text-geantSap-black">
                    {itemDetails?.administrativeData?.editedBy}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Edited On:</Label>
                  <span id="Editedon" className=" text-geantSap-black">
                    {itemDetails &&
                      new Date(
                        itemDetails?.administrativeData?.editedOn
                      ).toDateString()}
                  </span>
                </div>
              </div>
            </div>
            <Tabs defaultValue="Pricing" className="w-full ">
              <TabsList className="grid w-[35rem] grid-cols-4 ">
                <TabsTrigger value="Pricing">Pricing</TabsTrigger>
                <TabsTrigger value="Stock">Stock</TabsTrigger>
                <TabsTrigger value="Cost">Cost</TabsTrigger>
                <TabsTrigger value="Vendors">Vendors</TabsTrigger>
              </TabsList>
              <TabsContent
                className=" min-w-[1288px] border-2 border-geantSap-gray-25 rounded-lg"
                value="Pricing"
              >
                <table className="w-full ">
                  <thead className="bg-geantSap-gray-25">
                    <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                      <th className="p-6 rounded-tl-lg ">UoM</th>
                      <th className="p-6">Price</th>
                      <th className="p-6">Price-list name</th>
                      <th className="p-6">Discount</th>
                      <th className="p-6 rounded-tr-lg">Barcode</th>
                    </tr>
                  </thead>
                  <tbody className=" [&_tr:last-child]:border-0 ">
                    {itemDetails?.pricing.map((price, i) => (
                      <tr
                        key={i}
                        className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                      >
                        <td className="px-6 py-3">{price.UomCode}</td>
                        <td className="px-6 py-3">
                          {numberWithCommas(price.Price)}
                          LYD
                        </td>
                        <td className="px-6 ">{price.ListName}</td>
                        <td className="px-6 py-3">{price.Discount}</td>
                        <td className="px-6 py-3">{price.CodeBars}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>
              <TabsContent
                className=" min-w-[1288px] border-2 border-geantSap-gray-25 rounded-lg"
                value="Stock"
              >
                <table className="w-full ">
                  <thead className="bg-geantSap-gray-25">
                    <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                      {itemDetails &&
                        Object.keys(itemDetails.stock).map((key) => (
                          <th key={key} className="p-6 first:rounded-tl-lg last:rounded-tr-lg ">
                            {key} Stock
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className=" [&_tr:last-child]:border-0 ">
                    <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                      {itemDetails &&
                        Object.values(itemDetails.stock).map((value, i) => (
                          <td key={i} className="px-6 py-3">
                            {value}
                          </td>
                        ))}
                    </tr>
                  </tbody>
                </table>
              </TabsContent>
              <TabsContent
                className=" min-w-[1288px] border-2 border-geantSap-gray-25 rounded-lg"
                value="Cost"
              >
                <table className="w-full ">
                  <thead className="bg-geantSap-gray-25">
                    <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                      {itemDetails &&
                        Object.keys(itemDetails.cost).map((key) => (
                          <th key={key} className="p-6 first:rounded-tl-lg last:rounded-tr-lg ">
                            {key} Cost
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className=" [&_tr:last-child]:border-0 ">
                    <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                      {itemDetails &&
                        Object.values(itemDetails.cost).map((value, i) => (
                          <td key={i} className="px-6 py-3">
                            {value} LYD
                          </td>
                        ))}
                    </tr>
                  </tbody>
                </table>
              </TabsContent>
              <TabsContent
                className=" min-w-[1288px] rounded-lg"
                value="Vendors"
              >
                <table className="w-full ">
                  <thead className="bg-geantSap-gray-25">
                    <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                      <th className="p-6 rounded-tl-lg ">Vendor Code</th>

                      <th className="p-6 rounded-tr-lg">Vendor Name</th>
                    </tr>
                  </thead>
                  <tbody className=" [&_tr:last-child]:border-0 ">
                    {!itemDetails?.vendor?.length ? (
                      <tr className="h-[5rem]">
                        <td colSpan={2} className="text-center ">
                          No Venors to show
                        </td>
                      </tr>
                    ) : (
                      itemDetails?.vendor.map((vendor, i) => (
                        <tr
                          key={i}
                          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                        >
                          <td className="px-6 py-3">{vendor.vendorCode}</td>
                          <td className="px-6 py-3">{vendor.vendorName}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </TabsContent>
            </Tabs>
          </div>
        </DataRenderer>
      </div>
    </div>
  );
};

export default ItemDetails;
