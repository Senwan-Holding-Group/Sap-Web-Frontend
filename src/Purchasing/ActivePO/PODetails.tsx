import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  faCalendarCirclePlus,
  faChevronLeft,
  faSpinner,
  faX,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelPO, EditDocument, getActivePObyDocEntry } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import { useStateContext } from "@/context/useStateContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { DocumentLine } from "@/lib/types";
import {
  editDocumentFormSchema,
  EditDocumentRequest,
} from "@/lib/formsValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import moment from "moment";
import SelectVendor from "@/components/SelectVendor";
import SelectSection from "@/components/SelectSection";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import SelectWarehouse from "@/components/SelectWarehouse";
import ItemSelect from "@/components/ItemsSelect";
import Loader from "@/components/ui/Loader";

const PODetails = () => {
  const { id } = useParams();
  const { setError } = useStateContext();
  const queryClient = useQueryClient();
  const [isEdit, setisEdit] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const navigate = useNavigate();

  const { toast } = useToast();
  const [docLine, setdocLine] = useState<DocumentLine[]>([]);

  const {
    data: activePO,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["activePODetails"],
    queryFn: () => getActivePObyDocEntry(`/po/active/${id}`, setError),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  const form = useForm<EditDocumentRequest>({
    resolver: zodResolver(editDocumentFormSchema),
    defaultValues: {
      postingDate: new Date(),
      deliveryDate: new Date(),
      vendorCode: "",
      section: "",
      comments: "",
      documentLines: [],
    },
  });
  useEffect(() => {
    if (activePO) {
      form.reset({
        postingDate: moment(activePO.documentDate).toDate(),
        deliveryDate: moment(activePO.deliveryDate).toDate(),
        vendorCode: activePO.vendorCode,
        section: activePO.section === null ? "" : activePO.section,
        comments: activePO.comments === null ? "" : activePO.comments,
        documentLines: [],
      });
      setdocLine(activePO.documentLine);
    }
  }, [form, activePO]);

  const onSubmit = async (values: EditDocumentRequest) => {
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
    console.log(newValues);
    return EditDocument(
      `/po/active/${activePO?.documentEntry}`,
      newValues,
      form,
      setdocLine,
      toast,
      queryClient
    );
  };
  const vendorCode = form.watch("vendorCode");

  return (
    <Form {...form}>
      <div className=" h-[34rem] 3xl:h-[47rem] box-border max-h-[47rem] overflow-auto  ">
        <Loader enable={form.formState.isSubmitting} />

        <div className="bg-white border  border-geantSap-gray-25 geantShadow h-full  rounded-xl flex flex-col justify-between">
          <DataRenderer isLoading={isFetching} isError={isError}>
            <div className="px-6 py-4 flex gap-x-6 items-center border-b border-geantSap-gray-50">
              <Link
                to={"/purchasing/active-PO"}
                className="size-10 border flex items-center   cursor-pointer border-geantSap-gray-100 rounded-lg p-2"
              >
                <FontAwesomeIcon
                  className="size-6 text-geantSap-primary-600"
                  icon={faChevronLeft}
                />
              </Link>
              <span className="text-lg font-bold  text-geantSap-black">
                {activePO?.vendorCode}
              </span>
            </div>
            <div className="flex-1 w-full overflow-scroll py-6 px-4 flex flex-col gap-y-10">
              <div className="flex  min-w-[1288px]">
                <div className="flex w-[26.875rem] flex-col gap-y-6">
                  <h1 className="font-bold text-lg text-geantSap-gray-500">
                    PO Information
                  </h1>
                  <div className="flex flex-col gap-y-2 mt-2">
                    <Label className="text-sm font-bold text-geantSap-black">
                      Document number
                    </Label>
                    <span className="h-10 w-[21.1875rem] bg-geantSap-gray-25 text-geantSap-gray-400 border border-geantSap-gray-50 p-2 rounded-lg">
                      {activePO?.documentNumber}
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-2 ">
                    <Label className="text-sm font-bold text-geantSap-black">
                      Document date
                    </Label>

                    <span className="h-10 w-[21.188rem] border bg-geantSap-gray-25 text-geantSap-gray-400 border-geantSap-gray-50 p-2 rounded-lg">
                      {activePO?.documentDate.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-2 ">
                    <Label className="text-sm font-bold text-geantSap-black">
                      Document total
                    </Label>

                    <span className="h-10 w-[21.188rem] bg-geantSap-gray-25 text-geantSap-gray-400 border border-geantSap-gray-50 p-2 rounded-lg">
                      {activePO &&
                        parseFloat(activePO.documentTotal).toFixed(4)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Label className="text-sm font-bold text-geantSap-black">
                      Status
                    </Label>

                    <span className="h-10 w-[21.188rem] bg-geantSap-gray-25 text-geantSap-gray-400 border border-geantSap-gray-50 p-2 rounded-lg">
                      {activePO?.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-2 ">
                    <Label className="text-sm font-bold text-geantSap-black">
                      Currency
                    </Label>
                    <span className="h-10 w-[21.188rem] bg-geantSap-gray-25 text-geantSap-gray-400 border border-geantSap-gray-50 p-2 rounded-lg">
                      LYD
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-2 ">
                    <Label className="text-sm font-bold text-geantSap-black">
                      Process Status
                    </Label>

                    <span className="h-10 w-[21.188rem] bg-geantSap-gray-25 text-geantSap-gray-400 border border-geantSap-gray-50 p-2 rounded-lg">
                      {activePO?.processStatus}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col rounded-full w-[26.875rem] gap-y-6 ">
                  <h1 className="font-bold text-lg text-geantSap-gray-500">
                    PO Information
                  </h1>
                  <FormField
                    control={form.control}
                    name="vendorCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mt-2 gap-y-2 w-[21.188rem]">
                        <FormLabel className="text-sm font-bold text-geantSap-black">
                          Vendor Code
                        </FormLabel>
                        <FormControl>
                          <SelectVendor
                            disable={
                              !!docLine.length ||
                              form.formState.isSubmitting ||
                              !isEdit
                            }
                            form={form}
                            field={field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-y-2 ">
                    <Label className="text-sm font-bold text-geantSap-black">
                      Vendor Name
                    </Label>

                    <span className="h-10 w-[21.188rem] bg-geantSap-gray-25 text-geantSap-gray-400 border border-geantSap-gray-50 p-2 rounded-lg">
                      {activePO?.vendorName}
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem className="flex w-[21.188rem] flex-col gap-y-2">
                        <FormLabel className="text-sm font-bold text-geantSap-black">
                          Section
                        </FormLabel>
                        <FormControl>
                          <SelectSection
                            form={form}
                            field={field}
                            disabled={form.formState.isSubmitting || !isEdit}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postingDate"
                    render={({ field }) => (
                      <FormItem className="flex w-[21.188rem] flex-col gap-y-2">
                        <FormLabel className="text-sm font-bold text-geantSap-black">
                          Posting Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={
                                  form.formState.isSubmitting || !isEdit
                                }
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 font-normal",
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
                      <FormItem className="flex w-[21.188rem] flex-col gap-y-2">
                        <FormLabel className="text-sm font-bold text-geantSap-black">
                          Delivery Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={
                                  form.formState.isSubmitting || !isEdit
                                }
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left disabled:bg-geantSap-gray-25 font-normal disabled:text-geantSap-gray-400",
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
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem className="flex w-[21.1875rem] flex-col gap-y-2">
                        <FormLabel className="text-sm font-bold text-geantSap-black">
                          Comments
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={form.formState.isSubmitting || !isEdit}
                            placeholder="Comment"
                            className="h-10   border disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 border-geantSap-gray-50 p-2 rounded-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col w-[26.875rem] gap-y-6 ">
                  <h1 className="font-bold text-lg text-geantSap-gray-500">
                    Administrative data
                  </h1>
                  <div className="flex gap-x-4 mt-4 items-center font-normal text-base">
                    <Label className=" text-geantSap-gray-500">
                      Created By:
                    </Label>
                    <span id="createdby" className=" text-geantSap-black">
                      Adam
                    </span>
                  </div>
                  <div className="flex gap-x-4  items-center font-normal text-base">
                    <Label className=" text-geantSap-gray-500">
                      Created On:
                    </Label>
                    <span id="createdon" className=" text-geantSap-black">
                      12/6/2024, 14:12:00 AM
                    </span>
                  </div>
                  <div className="flex gap-x-4  items-center font-normal text-base">
                    <Label className=" text-geantSap-gray-500">
                      Edited By:
                    </Label>
                    <span id="Editedby" className=" text-geantSap-black">
                      Adam
                    </span>
                  </div>
                  <div className="flex gap-x-4  items-center font-normal text-base">
                    <Label className=" text-geantSap-gray-500">
                      Edited On:
                    </Label>
                    <span id="Editedon" className=" text-geantSap-black">
                      12/6/2024, 14:12:00 AM
                    </span>
                  </div>
                </div>
              </div>
              <Tabs defaultValue="item" className="min-w-max  ">
                <TabsList className="grid w-60 grid-cols-2 ">
                  <TabsTrigger value="item">Item</TabsTrigger>
                  <TabsTrigger disabled value="attachment">
                    Attachment
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  className=" w-full border-2  border-geantSap-gray-25 rounded-lg"
                  value="item"
                >
                  <table className="w-full text-nowrap ">
                    <thead className="bg-geantSap-gray-25">
                      <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                        <th className="p-6 rounded-tl-lg ">Item No.</th>
                        <th className="p-6">Item description</th>
                        <th className="p-6">Quantity</th>
                        <th className="p-6">UOM Code</th>
                        <th className="p-6">UOM Group</th>
                        <th className="p-6">Price</th>
                        <th className="p-6">Total (LC)</th>
                        <th className="p-6 ">Warehouse code</th>
                        <th className="p-6 rounded-tr-lg"></th>
                      </tr>
                    </thead>
                    <tbody className=" [&_tr:last-child]:border-0">
                      {docLine.map((item, i) => (
                        <tr
                          key={i}
                          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                        >
                          <td className="px-6 py-3">{item.itemCode}</td>
                          <td className="px-6 py-3">
                            {item.itemName
                              ? item.itemName
                              : item.itemDescription}
                          </td>
                          <td className="px-6 ">
                            <Input
                              value={item.quantity || 1}
                              key={i}
                              disabled={!isEdit}
                              onChange={(e) => {
                                setdocLine(
                                  docLine.map((value) => {
                                    if (
                                      value.lineNum != item.lineNum ||
                                      value.line != item.line
                                    ) {
                                      return value;
                                    } else {
                                      return {
                                        ...value,
                                        quantity: parseFloat(e.target.value)
                                          ? Math.abs(parseFloat(e.target.value))
                                          : 1,
                                        total: parseFloat(e.target.value)
                                          ? Math.abs(
                                              parseFloat(e.target.value) *
                                                value.price
                                            )
                                          : value.price,
                                      };
                                    }
                                  })
                                );
                              }}
                              className="w-[5rem] p-0 h-1/2 border-0 disabled:opacity-50 text-center rounded-lg"
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
                              disable={!isEdit}
                              docLine={docLine}
                              setdocLine={setdocLine}
                            />
                          </td>
                          <td className="px-6">
                            <Button
                              disabled={!isEdit}
                              onClick={() => {
                                setdocLine(
                                  docLine.filter((value) => {
                                    return (
                                      value.lineNum !== item.lineNum ||
                                      value.line !== item.line
                                    );
                                  })
                                );
                              }}
                              type="button"
                              size={"icon"}
                              className=" flex p-0 items-center disabled:opacity-50 justify-center bg-transparent "
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
                          {isEdit && (
                            <ItemSelect
                              vendorCode={vendorCode}
                              setState={setdocLine}
                              state={docLine}
                            />
                          )}
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
          </DataRenderer>
          <div className="flex justify-end gap-x-4 p-6 border-t borde-geantSap-gray-50">
            {form.formState.errors.root && (
              <div className="text-center text-sm rounded-lg border border-red-500 bg-red-200 w-1/2 p-2">
                {form.formState.errors.root.message}
              </div>
            )}

            {!isEdit ? (
              <>
                <Button
                  type="button"
                  disabled={activePO?.status === "Closed" || isSubmitting}
                  onClick={() => {
                    if (activePO) {
                      cancelPO(
                        activePO.documentEntry,
                        navigate,
                        toast,
                        setisSubmitting
                      );
                    }
                  }}
                  className="bg-transparent text-geantSap-error-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg"
                >
                  Cancel PO
                </Button>
                <Button
                  type="button"
                  disabled={form.formState.isSubmitting}
                  className="bg-transparent text-geantSap-primary-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg"
                >
                  Save PO as
                </Button>
                <Button
                  disabled={activePO?.status === "Closed"}
                  type="button"
                  onClick={(e) => {
                    if (!isEdit) {
                      e.preventDefault();
                      setisEdit(true);
                    }
                  }}
                  className="bg-geantSap-primary-500 disabled:opacity-50 rounded-lg"
                >
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => {
                    setisEdit(false);
                  }}
                  disabled={form.formState.isSubmitting}
                  className="bg-transparent text-geantSap-primary-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg"
                >
                  Cancel Edit
                </Button>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-geantSap-primary-500  disabled:opacity-50 rounded-lg"
                >
                  {form.formState.isSubmitting && (
                    <FontAwesomeIcon className="" icon={faSpinner} spin />
                  )}
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default PODetails;
