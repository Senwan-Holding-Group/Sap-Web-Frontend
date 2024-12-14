import SelectItem from "@/components/SelectItem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentLine } from "@/lib/types";
import { faFileCirclePlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CreatePO = () => {
  const [docLine, setdocLine] = useState<DocumentLine[]>([]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-geantSap-primary-500 w-[11.25rem] flex items-center rounded-lg">
          <span className="size-6 flex items-center justify-center">
            <FontAwesomeIcon className="" icon={faFileCirclePlus} />
          </span>
          <span className="font-medium text-base ">Create PO</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}className="h-[41rem] flex flex-col justify-between 3xl:h-[47.5rem]  sm:max-w-7xl w-[90%] ">
        <div className="px-6 py-4">
          <DialogHeader className="border-b border-geantSap-gray-50  h-[3.25rem]">
            <DialogTitle className="text-2xl p-2 leading-9 font-bold text-geantSap-primary-500 ">
              New purchase order
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="flex w-full flex-col b   gap-y-6 p-6 overflow-scroll h-full ">
          <div className=" flex justify-between  min-w-max gap-x-4">
            <div className="w-[21.1875rem] flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>
            </div>
            <div className="w-[21.1875rem] flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>
            </div>
            <div className="w-[21.1875rem] flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>

              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document number
                </Label>
                <Input className="h-10   border border-geantSap-gray-50 p-2 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="border-t border-geantSap-gray-50">
            <Tabs defaultValue="item" className=" mt-4 ">
              <TabsList className="grid w-60 grid-cols-2 ">
                <TabsTrigger value="item">Item</TabsTrigger>
                <TabsTrigger disabled value="attachment">
                  Attachment
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className="max-w-7xl border-2 overflow-scroll border-geantSap-gray-25 rounded-lg"
                value="item"
              >
                <table className="w-full text-nowrap  ">
                  <thead className="bg-geantSap-gray-25">
                    <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                      <th className="px-6 py-3 rounded-tl-lg ">Item No.</th>
                      <th className="px-6 py-3">Item description</th>
                      <th className="px-6 py-3">Quantity</th>
                      <th className="px-6 py-3">UOM Code</th>
                      <th className="px-6 py-3">UOM Group</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Total (LC)</th>
                      <th className="px-6 py-3 rounded-tr-lg">
                        Warehouse code
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" [&_tr:last-child]:border-0">
                    {docLine?.map((item, i) => (
                      <tr
                        key={i}
                        className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                      >
                        <td className="px-6 py-3">{item.itemCode}</td>
                        <td className="px-6 py-3">{item.itemName}</td>
                        <td className="px-6 ">
                          <Input
                            value={item.quantity}
                            key={i}
                            onChange={(e) => {
                              const update = docLine.map((value) => {
                                if (value.itemCode != item.itemCode) {
                                  return value;
                                } else {
                                  return {
                                    ...value,
                                    quantity: parseFloat(e.target.value)
                                      ? parseFloat(e.target.value)
                                      : 1,
                                    total: parseFloat(e.target.value)
                                      ? parseFloat(e.target.value) * value.price
                                      : value.price,
                                  };
                                }
                              });
                              setdocLine(update);
                              
                            }}
                            className="w-[5rem] p-0 h-11 border-0  rounded-none"
                          />
                        </td>
                        <td className="px-6 py-3">{item.uomCode}</td>
                        <td className="px-6 py-3">{item.uomGroup}</td>
                        <td className="px-6 py-3">{new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                          }).format(item.price)} LYD</td>
                        <td className="px-6 py-3">
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                          }).format(item.total)}
                          LYD
                        </td>
                        <td className="px-6 py-3">{item.warehouseCode}</td>
                      </tr>
                    ))}
                    <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                      <td className="px-6 py-3 ">
                        <SelectItem setState={setdocLine} state={docLine} />
                      </td>
                    </tr>
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
        </div>
        <DialogFooter className=" bg-[#fcfcfc] rounded-bl-lg p-6  rounded-br-lg  border-t flex flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
          <DialogClose asChild>
            <Button
              className="bg-white w-[8.125rem] border rounded-lg text-geantSap-primary-600 font-medium text-base"
              type="button"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-geantSap-primary-500 w-[8.125rem] rounded-lg font-medium text-base"
            type="submit"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePO;
