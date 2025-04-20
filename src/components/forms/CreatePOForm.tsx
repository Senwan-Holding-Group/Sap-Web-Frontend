import { CreatePOFormSchema, CreatePORequest } from "@/lib/formsValidation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCirclePlus,
  faFileExport,
  faSpinner,
  faX,
} from "@fortawesome/pro-solid-svg-icons";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DialogClose } from "../ui/dialog";
import { useCallback, useState } from "react";
import { DocumentLine } from "@/lib/types";
import { Calendar } from "../ui/calendar";
import SelectVendor from "../SelectVendor";
import SelectSection from "../SelectSection";
import ItemSelect from "../ItemsSelect";
import { createPo, exportItemsBy } from "@/api/client";
import { useToast } from "@/lib/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import SelectWarehouse from "../SelectWarehouse";
import Loader from "../ui/Loader";
import { Label } from "../ui/label";
import ImportItems from "../ImportItems";

const CreatePOForm = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const [docLine, setdocLine] = useState<DocumentLine[]>([]);
  const form = useForm<CreatePORequest>({
    resolver: zodResolver(CreatePOFormSchema),
    defaultValues: {
      postingDate: new Date(),
      deliveryDate: new Date(),
      vendorCode: "",
      section: "",
      comments: "",
      documentLines: [],
    },
  });

  const onSubmit = async (values: CreatePORequest) => {
    const newValues = {
      ...values,
      section: values.section === "" ? "999" : values.section,
      documentLines: docLine.map((item) => {
        return {
          itemCode: item.itemCode,
          quantity: item.quantity.toString(),
          price: item.price.toString(),
          uomCode: item.uomCode,
          warehouseCode: item.warehouseCode
            ? item.warehouseCode
            : item.warehouseList[0],
          uomEntry: item.uomEntry,
        };
      }),
    };
    return createPo(newValues, form, setdocLine, toast, queryClient);
  };
  const calculateDocumentTotal = useCallback(() => {
    return docLine?.reduce((sum, line) => sum + (line.total || 0), 0);
  }, [docLine]);
  const documentTotal = calculateDocumentTotal();
  const calculateLineTotal = (quantity: number, price: number): number => {
    return Number((Math.abs(quantity) * price).toFixed(4));
  };

  const updateLineQuantity = (line: number, newQuantity: string) => {
    const quantity = parseFloat(newQuantity);

    if (isNaN(quantity)) return;

    setdocLine(
      docLine.map((value) => {
        if (value.line != line) {
          return value;
        }

        return {
          ...value,
          quantity: Math.abs(quantity),
          total: calculateLineTotal(quantity, value.price),
        };
      })
    );
  };

  const vendorCode = form.watch("vendorCode");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-scroll  justify-between h-full"
      >
        <Loader enable={form.formState.isSubmitting} />

        <div className="flex w-full flex-col  overflow-scroll  gap-y-6 p-6 h-full ">
          <div className="flex justify-between gap-x-[9.5rem]  min-w-max ">
            <div className="w-[21.1875rem] flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="postingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="text-sm font-bold text-geantSap-black">
                      Posting Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left bgtr font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <FontAwesomeIcon
                              icon={faCalendarCirclePlus}
                              className="ml-auto text-geantSap-primary-600 h-4 w-4 "
                            />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 " align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="text-sm font-bold text-geantSap-black">
                      Delivery Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left bgtr font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <FontAwesomeIcon
                              icon={faCalendarCirclePlus}
                              className="ml-auto text-geantSap-primary-600 h-4 w-4 "
                            />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 " align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[21.1875rem] flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="vendorCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="text-sm font-bold text-geantSap-black">
                      Vendor Code
                    </FormLabel>
                    <FormControl>
                      <SelectVendor
                        disable={!!docLine.length}
                        form={form}
                        field={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="text-sm font-bold text-geantSap-black">
                      Section
                    </FormLabel>
                    <FormControl>
                      <SelectSection form={form} field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[21.1875rem] flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel className="text-sm font-bold text-geantSap-black">
                      Comments
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Comment"
                        className="h-10   border border-geantSap-gray-50 p-2 rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-y-2 ">
                <Label className="text-sm font-bold text-geantSap-black">
                  Document total
                </Label>

                <span className="h-10 w-[21.188rem] bg-geantSap-gray-25 text-geantSap-gray-400 border border-geantSap-gray-50 p-2 rounded-lg">
                  {docLine.length > 0
                    ? `${new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      }).format(
                        // docLine.reduce((sum, item) => sum + item.total, 0)
                        documentTotal
                      )} LYD`
                    : "0.0000 LYD"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t relative border-geantSap-gray-50 min-w-max">
            <Tabs defaultValue="item" className=" mt-4">
              <TabsList className="grid w-60 grid-cols-2 ">
                <TabsTrigger value="item">Item</TabsTrigger>
                <TabsTrigger disabled value="attachment">
                  Attachment
                </TabsTrigger>
              </TabsList>
              <div className="absolute right-0 top-4 flex gap-x-4 ">
                <ImportItems
                  url="/item/vendor/bulk"
                  Code={vendorCode}
                  setState={setdocLine}
                />
                <Button type="button" onClick={()=>{
                  exportItemsBy("vendor",vendorCode)
                }} disabled={vendorCode==""} className="bg-geantSap-primary-500 w-[11.25rem] flex items-center disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 disabled:cursor-not-allowed rounded-lg">
                  <span className="size-6 flex items-center justify-center">
                    <FontAwesomeIcon className="size-6" icon={faFileExport} />
                  </span>
                  <span className="font-medium text-base ">Export Items</span>
                </Button>
              </div>
              <TabsContent
                className="w-full border-2 overflow-scroll border-geantSap-gray-25 rounded-lg"
                value="item"
              >
                <table className="w-full text-nowrap bg-white ">
                  <thead className="bg-geantSap-gray-25">
                    <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                      <th className="px-6 py-3 rounded-tl-lg ">Item No.</th>
                      <th className="px-6 py-3">Item description</th>
                      <th className="px-6 py-3">Quantity</th>
                      <th className="px-6 py-3">UOM Code</th>
                      <th className="px-6 py-3">UOM Group</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Total (LC)</th>
                      <th className="px-6 py-3">Warehouse code</th>
                      <th className="px-6 py-3 rounded-tr-lg">Remove item</th>
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
                            step="0.01"
                            type="number"
                            key={i}
                            onChange={(e) => {
                              updateLineQuantity(item.line, e.target.value);
                            }}
                            className="w-[5rem] p-0 h-1/2 border-0 text-center rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-3">{item.uomCode}</td>
                        <td className="px-6 py-3">{item.uomGroup}</td>
                        <td className="px-6 py-3">
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                            currency: "LYD",
                          }).format(item.price)}{" "}
                          LYD
                        </td>
                        <td className="px-6 py-3">
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                          }).format(item.total)}
                          LYD
                        </td>
                        <td className="px-6 py-3">
                          <SelectWarehouse
                            item={item}
                            docLine={docLine}
                            setdocLine={setdocLine}
                          />
                        </td>
                        <td className="px-6">
                          <Button
                            onClick={() => {
                              setdocLine(
                                docLine.filter((value) => {
                                  return value.line != item.line;
                                })
                              );
                            }}
                            type="button"
                            size={"icon"}
                            className=" flex p-0 items-center justify-center bg-transparent "
                          >
                            <FontAwesomeIcon
                              className="text-geantSap-error-500"
                              icon={faX}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                      <td className="px-6 py-3 ">
                        <ItemSelect
                          code={vendorCode}
                          setState={setdocLine}
                          state={docLine}
                          type="vendor"
                        />
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
        <div className=" bg-[#fcfcfc] w-full rounded-bl-lg p-6  rounded-br-lg  border-t flex justify-center sm:justify-end flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
          {form.formState.errors.root && (
            <div className="text-center text-sm rounded-lg border border-red-500 bg-red-200 w-1/2 p-2">
              {form.formState.errors.root.message}
            </div>
          )}
          <DialogClose asChild>
            <Button
              disabled={form.formState.isSubmitting}
              onClick={() => {
                form.reset();
                setdocLine([]);
              }}
              className="bg-white w-[8.125rem] border rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
              type="button"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={form.formState.isSubmitting}
            className="bg-geantSap-primary-500 w-[8.125rem] disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base"
            type="submit"
          >
            {form.formState.isSubmitting && (
              <FontAwesomeIcon className="" icon={faSpinner} spin />
            )}
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePOForm;
