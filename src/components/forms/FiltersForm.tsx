import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterForm, filterFormSchema } from "@/lib/formsValidation";
import { capitalize, cn } from "@/lib/utils";
import {
  faCalendarCirclePlus,
  faCheckDouble,
  faFileExport,
  faSpinner,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatDate } from "date-fns";
import { useForm } from "react-hook-form";
import Filters from "../Filters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { exportReport, getReportTypes } from "@/api/client";
import { useStateContext } from "@/context/useStateContext";
import { useToast } from "@/lib/hooks/use-toast";
type FilterProps = {
  setquery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
};
const FiltersForm = ({ setquery, query }: FilterProps) => {
  const [filter, setfilter] = useState<Record<string, string[]>>({});
  const { setError } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<FilterForm>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      reportType: "",
      from: new Date(),
      to: new Date(),
    },
  });

  const onSubmit = async (values: FilterForm) => {
    const newData = { ...filter, ...values,from:new Date(format(values.from, "yyyy-MM-dd")),to:new Date(format(values.to, "yyyy-MM-dd")) };
    setquery(JSON.stringify(newData));
  };

  const { data: reportTypeList } = useQuery({
    queryKey: ["reportTypeList"],
    queryFn: () => getReportTypes(`/report`, setError),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  const reportType = form.watch("reportType");
  const handleDownload = async () => {
    await exportReport(
      query,
      `${
        capitalize(reportType)
          .replace(/([A-Z])/g, " $1")
          .trim() +
        " " +
        formatDate(Date.now(), "PP")
      }`,

      setIsLoading,
      toast
    );
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full  ">
        <div className="flex justify-between w-full gap-x-4 gap-y-2 sm:flex-row flex-col">
          <FormField
            control={form.control}
            name="reportType"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 flex-1">
                <div className="flex justify-between">
                  <FormLabel className="text-sm font-bold text-geantSap-black">
                    Report Type
                  </FormLabel>
                  <FormMessage />
                </div>

                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="justify-between rounded-lg  border border-geantSap-gray-50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypeList?.map((value: { queryName: string }) => (
                        <SelectItem
                          key={value.queryName}
                          value={value.queryName}>
                          {capitalize(value.queryName)
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 flex-1">
                <div className="flex justify-between">
                  <FormLabel className="text-sm font-bold text-geantSap-black">
                    From
                  </FormLabel>
                  <FormMessage />
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left  font-normal",
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 flex-1">
                <div className="flex justify-between">
                  <FormLabel className="text-sm font-bold text-geantSap-black">
                    To
                  </FormLabel>
                  <FormMessage />
                </div>

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
              </FormItem>
            )}
          />
        <div className="flex gap-x-4 flex-1 items-end  overflow-x-scroll overflow-y-hidden justify-cente ">
          <Button
            type="button"
            disabled={query === "" || isLoading}
            onClick={handleDownload}
            className="bg-geantSap-primary-500 disabled:bg-geantSap-gray-50 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base">
            <span className="size-6 flex items-center justify-center">
              <FontAwesomeIcon
                className=""
                icon={isLoading ? faSpinner : faFileExport}
                spin={isLoading}
              />
            </span>
            <span className="font-medium text-base ">Export Report</span>
          </Button>
          <Filters
            form={form}
            onSubmit={onSubmit}
            setfilter={setfilter}
            filter={filter}
          />
          <Button
            type="submit"
            className="bg-geantSap-primary-500 w-[7.5rem] disabled:bg-geantSap-gray-50 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base">
            <span className="size-6 flex items-center justify-center">
              <FontAwesomeIcon className="" icon={faCheckDouble} />
            </span>
            <span className="font-medium text-base ">View</span>
          </Button>
        </div>
        </div>
      </form>
    </Form>
  );
};

export default FiltersForm;
