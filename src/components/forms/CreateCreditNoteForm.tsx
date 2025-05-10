import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  faCalendarCirclePlus,
  faSpinner,
} from "@fortawesome/pro-solid-svg-icons";
import { useToast } from "@/lib/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Vendor } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
  CreateCreditNote,
  CreateCreditNoteFormSchema,
} from "@/lib/formsValidation";
import { Input } from "../ui/input";
import { useState } from "react";
import { creditNoteOptions } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Loader from "../ui/Loader";
import { createCreditNote } from "@/api/client";
type VendorProps = {
  vendorDetails: Vendor | undefined;
};
const CreateCreditNoteForm = ({ vendorDetails }: VendorProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const form = useForm<CreateCreditNote>({
    resolver: zodResolver(CreateCreditNoteFormSchema),
    defaultValues: {
      documentDate: new Date(),
      remark: "",
      type: "N",
      vendorCode: vendorDetails?.vendorCode,
      creditNoteList: {},
    },
  });
  const handleAddField = (value: string) => {
    if (!selectedFields.includes(value)) {
      setSelectedFields([...selectedFields, value].reverse());
      form.setValue(`creditNoteList.${value}`, "0");
    }
  };

  const handleRemoveField = (fieldName: string) => {
    setSelectedFields(selectedFields.filter((field) => field !== fieldName));
    const currentValues = form.getValues("creditNoteList");
    delete currentValues[fieldName];
    form.setValue("creditNoteList", currentValues);
  };
  const onSubmit = async (values: CreateCreditNote) => {
    const newValues = {
      documentDate:new Date(format(values.documentDate, "yyyy-MM-dd")),
      vendorCode: values.vendorCode,
      remark: values.remark,
      type: values.type,
      ...values.creditNoteList,
      
    }
    console.log(newValues);
    
    return createCreditNote(newValues, form,setSelectedFields, toast, queryClient);
    
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full overflow-scroll  justify-between h-full">
        <Loader enable={form.formState.isSubmitting} />

        <div className="flex w-full flex-col  overflow-scroll  gap-y-6 p-6 h-full  ">
          <div className=" flex gap-x-4  ">
            <FormField
              control={form.control}
              name="documentDate"
              render={({ field }) => (
                <FormItem className="flex w-[21.1875rem] flex-col gap-y-2">
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
                          )}>
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
            <div className="flex w-[21.1875rem] flex-col gap-y-2">
              <FormLabel className="text-sm font-bold text-geantSap-black">
                Vendor
              </FormLabel>
              <Input
                className="w-full border border-geantSap-gray-50 rounded-lg p-2 text-sm"
                type="text"
                value={vendorDetails?.vendorName}
                readOnly
              />
            </div>
          </div>
          <div className=" flex gap-x-4  ">
            <div className="flex w-[21.1875rem] flex-col gap-y-2">
              <FormLabel className="text-sm font-bold text-geantSap-black">
                Credit Note type
              </FormLabel>
              <Select onValueChange={handleAddField}>
                <SelectTrigger className="w-full border  border-geantSap-gray-50 ">
                  <SelectValue placeholder="Add new field" />
                </SelectTrigger>
                <SelectContent className="h-[15rem]">
                  {Object.entries(creditNoteOptions).map(
                    ([key, label]) =>
                      !selectedFields.includes(key) && (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[21.1875rem] flex-col gap-y-2">
              <FormField
                control={form.control}
                name="remark"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <div className="flex justify-between items-center">

                    <FormLabel className="text-sm font-bold text-geantSap-black">
                      Remarks
                    </FormLabel>
                    <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border border-geantSap-gray-50 rounded-lg p-2 text-sm"
                        type="text"
                        placeholder="Enter remarks"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4 flex-wrap   ">
            {selectedFields.map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={`creditNoteList.${fieldName}`}
                render={({ field }) => (
                  <FormItem className="flex flex-col  w-[21.1875rem] ">
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-sm font-bold text-geantSap-black text-nowrap">
                        {
                          creditNoteOptions[
                            fieldName as keyof typeof creditNoteOptions
                          ]
                        }
                      </FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-geantSap-error-600 font-bold hover:text-geantSap-error-500"
                        size="icon"
                        onClick={() => handleRemoveField(fieldName)}>
                        ✕
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        className=""
                        type="number"
                        placeholder="Enter amount"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
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
              }}
              className="bg-white w-[8.125rem] border rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
              type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={form.formState.isSubmitting}
            className="bg-geantSap-primary-500 w-[8.125rem] disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base"
            type="submit">
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

export default CreateCreditNoteForm;
