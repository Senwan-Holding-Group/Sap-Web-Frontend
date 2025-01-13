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
import { reportsSelect } from "@/lib/constants";
import { FilterForm, filterFormSchema } from "@/lib/formsValidation";
import { cn } from "@/lib/utils";
import {
  faCalendarCirclePlus,
  faCheckDouble,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import Filters from "../Filters";
import { useState } from "react";
type FilterProps={
  setquery:React.Dispatch<React.SetStateAction<string>>
}
const FiltersForm = ({setquery}:FilterProps) => {
  const [filter, setfilter] = useState<Record<string, string[]>>({});

  const form = useForm<FilterForm>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      reportType: "",
      from: new Date(),
      to: new Date(),
    },
  });

  const onSubmit = async (values: FilterForm) => {
    const newData= {...filter, ...values}
    setquery(JSON.stringify(newData))
    
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full flex items-end gap-4 justify-between lg:flex-row flex-col "
      >
        <div className="flex justify-between w-full gap-x-4 md:flex-row flex-col">
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
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full justify-between rounded-lg  border border-geantSap-gray-50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportsSelect.map((value) => (
                        <SelectItem key={value.label} value={value.value}>
                          {value.label}
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
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 justify-center ">
          <Filters setfilter={setfilter} filter={filter}/>
          <Button
            type="submit"
            className="bg-geantSap-primary-500 w-[7.5rem] disabled:bg-geantSap-gray-50 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base"
          >
            <span className="size-6 flex items-center justify-center">
              <FontAwesomeIcon className="" icon={faCheckDouble} />
            </span>
            <span className="font-medium text-base ">View</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FiltersForm;
