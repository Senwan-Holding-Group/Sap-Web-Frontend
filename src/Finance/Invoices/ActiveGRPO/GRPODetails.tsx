import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { faChevronLeft, faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { EditGRPOLine, getActiveGRPObyDocEntry } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import { useStateContext } from "@/context/useStateContext";
import { useEffect, useState } from "react";
import { DocumentLine } from "@/lib/types";
import { numberWithCommas } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/lib/hooks/use-toast";
import Loader from "@/components/ui/Loader";
import CopyToAP from "@/components/CopyToAP";
import Attachments from "@/components/Attachments";
import SelectLayout from "@/components/SelectLayout";

const GRPODetails = () => {
  const { id } = useParams();
  const { setError } = useStateContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEdit, setisEdit] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [docLine, setdocLine] = useState<DocumentLine[]>([]);
  const {
    data: activeGRPO,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["activeGRPODetails", id],
    queryFn: () => getActiveGRPObyDocEntry(`/grpo/active/${id}`, setError),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (activeGRPO) {
      setdocLine(activeGRPO.documentLine);
    }
  }, [activeGRPO]);

  return (
    <div className=" sm:h-[35rem] 3xl:h-[47rem] h-[52.5rem] box-border max-h-[52.5rem] overflow-auto  ">
      <Loader enable={isSubmitting} />

      <div className="bg-white border  border-geantSap-gray-25 geantShadow h-full  rounded-xl flex flex-col justify-between">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <div className="px-6 py-4 flex gap-x-6 items-center border-b border-geantSap-gray-50">
            <Link
              to={"/sap/invoices/GRPO"}
              className="size-10 border flex items-center   cursor-pointer border-geantSap-gray-100 rounded-lg p-2">
              <FontAwesomeIcon
                className="size-6 text-geantSap-primary-600"
                icon={faChevronLeft}
              />
            </Link>
            <span className="text-lg font-bold  text-geantSap-black">
              {activeGRPO?.vendorCode}
            </span>
          </div>
          <div className="flex-1 w-full overflow-scroll py-6 px-4 flex flex-col gap-y-10">
            <div className="flex  min-w-[1288px]">
              <div className="flex w-[26.875rem] flex-col gap-y-6">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  GRPO Information
                </h1>
                <div className="flex flex-col gap-y-2 mt-2">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Document number
                  </Label>
                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.documentNumber}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Document date
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.documentDate?.split(" ")[0]}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Document total
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO && numberWithCommas(activeGRPO.documentTotal)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Vendor Code
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.vendorCode}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Vendor Name
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.vendorName}
                  </span>
                </div>

                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Section
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.section}
                  </span>
                </div>
              </div>
              <div className="flex flex-col rounded-full w-[26.875rem] gap-y-6 ">
                <h1 className="font-bold text-lg text-geantSap-gray-500">
                  GRPO Information
                </h1>
                <div className="flex flex-col gap-y-2">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Status
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.status}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Vendor invoice NO.
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.invoiceNumber}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Receiving date
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.receivingDate?.split(" ")[0]}
                  </span>
                </div>

                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Currency
                  </Label>
                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    LYD
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Comments
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.comments}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <Label className="text-sm font-bold text-geantSap-black">
                    Process Status
                  </Label>

                  <span
                    className={`h-10 w-[21.188rem] ${
                      isEdit ? "bg-geantSap-gray-25 text-geantSap-gray-400" : ""
                    }  border border-geantSap-gray-50 p-2 rounded-lg`}>
                    {activeGRPO?.processStatus}
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
                    {activeGRPO?.administrativeData?.createdBy}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Created On:</Label>
                  <span id="createdon" className=" text-geantSap-black">
                    {activeGRPO &&
                      new Date(
                        activeGRPO?.administrativeData?.createdOn
                      ).toDateString()}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Edited By:</Label>
                  <span id="Editedby" className=" text-geantSap-black">
                    {activeGRPO?.administrativeData?.editedBy}
                  </span>
                </div>
                <div className="flex gap-x-4  items-center font-normal text-base">
                  <Label className=" text-geantSap-gray-500">Edited On:</Label>
                  <span id="Editedon" className=" text-geantSap-black">
                    {activeGRPO &&
                      new Date(
                        activeGRPO?.administrativeData?.editedOn
                      ).toDateString()}
                  </span>
                </div>
              </div>
            </div>
            <Tabs defaultValue="item" className="min-w-max  ">
              <TabsList className="grid w-60 grid-cols-2 ">
                <TabsTrigger value="item">Item</TabsTrigger>
                <TabsTrigger value="attachment">Attachment</TabsTrigger>
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
                      <th className="p-6">Price Status</th>
                      <th className="p-6">invoice Price</th>
                      <th className="p-6">Action</th>
                      <th className="p-6">Quantity</th>
                      <th className="p-6">UOM Code</th>
                      <th className="p-6 ">UOM Group</th>
                      <th className="p-6 ">Warehouse</th>
                      <th className="p-6  rounded-tr-lg">Total line</th>
                    </tr>
                  </thead>
                  <tbody className=" [&_tr:last-child]:border-0">
                    {docLine.map((item, i) => (
                      <tr
                        key={i}
                        className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                        <td className="px-6 py-3">{item.itemCode}</td>
                        <td className="px-6 py-3">{item.itemDescription}</td>
                        <td className="px-6 py-3">
                          {numberWithCommas(item.price)}
                          LYD
                        </td>
                        <td className="px-6 ">
                          <Select
                            onValueChange={(SelectValue) => {
                              console.log(SelectValue);

                              setdocLine(
                                docLine.map((value) => {
                                  if (value.lineNumber != item.lineNumber) {
                                    return value;
                                  } else {
                                    return {
                                      ...value,
                                      priceStatus: SelectValue,
                                    };
                                  }
                                })
                              );
                            }}
                            value={item.priceStatus}
                            disabled={!isEdit}>
                            <SelectTrigger className="w-[8.5rem] justify-between">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="">
                              <SelectItem key={"Y"} value={"Y"}>
                                Matched
                              </SelectItem>
                              <SelectItem key={"N"} value={"N"}>
                                UnMatched
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-6 ">
                          <Input
                            key={i}
                            type="number"
                            value={item.invoicePrice}
                            onChange={(e) => {
                              setdocLine(
                                docLine.map((value) => {
                                  if (value.lineNumber != item.lineNumber) {
                                    return value;
                                  } else {
                                    return {
                                      ...value,
                                      invoicePrice: Number(e.target.value),
                                    };
                                  }
                                })
                              );
                            }}
                            disabled={!isEdit}
                            className="w-[5rem] p-0 h-1/2 border-0 disabled:opacity-50 text-center rounded-lg"
                          />
                        </td>
                        <td className="px-6 ">
                          {item.action === "N"
                            ? "None"
                            : item.action === "I"
                            ? "Invoice Price"
                            : "Order Price"}
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
              <TabsContent
                className=" min-w-[1288px] border-2 border-geantSap-gray-25 rounded-lg"
                value="attachment">
                <Attachments attachmentList={activeGRPO?.attachment}/>
              
              </TabsContent>
            </Tabs>
          </div>
        </DataRenderer>
        <div className="flex justify-end gap-x-4 p-6 border-t borde-geantSap-gray-50">
          {!isEdit ? (
            <>
              <Button
                disabled={activeGRPO?.status === "Closed" || isFetching}
                type="button"
                onClick={(e) => {
                  if (!isEdit) {
                    e.preventDefault();
                    setisEdit(true);
                  }
                }}
                className="bg-transparent text-geantSap-primary-600 border border-geantSap-gray-100 disabled:opacity-50 rounded-lg">
                Edit
              </Button>
              <SelectLayout title="Save GRPO as" disabled={isFetching} />

              <CopyToAP
                disabled={isFetching}
                docEntry={id}
                title="Copy to A/P"
              />
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={() => {
                  setisEdit(false);
                }}
                disabled={isSubmitting}
                className="bg-transparent text-geantSap-primary-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
                Cancel Edit
              </Button>
              <Button
                disabled={isSubmitting}
                type="submit"
                onClick={() => {
                  EditGRPOLine(
                    `/grpo/active/${activeGRPO?.documentEntry}`,
                    docLine,
                    setdocLine,
                    setisSubmitting,
                    toast,
                    queryClient
                  );
                  console.log(docLine);
                }}
                className="bg-geantSap-primary-500  disabled:opacity-50 rounded-lg">
                {isSubmitting && (
                  <FontAwesomeIcon className="" icon={faSpinner} spin />
                )}
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GRPODetails;
