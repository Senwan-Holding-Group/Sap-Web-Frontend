import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  faCalendarCirclePlus,
  faCheckDouble,
  faFilterList,
  faX,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useLocation } from "react-router-dom";
type FilterProps = {
  setquery: React.Dispatch<React.SetStateAction<string>>;
  query?: string;
};
const GRPOFilter = ({ setquery,query }: FilterProps) => {
  const {pathname}=useLocation()
  const [filter, setfilter] = useState<{
    status?: string;
    receivingDate?: Date;
  }>({});
  const [open, setOpen] = useState(false);
  const handleStatusChange = (value: string) => {
    setfilter((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setfilter((prev) => ({
        ...prev,
        receivingDate: date,
      }));
    } else {
      setfilter((prev) => ({
        ...prev,
        receivingDate: undefined,
      }));
    }
  };
  const dateFilter=pathname.includes("AP-invoice")?"dueDate":"receivingDate"
  
  const clearFilters = () => {
    setfilter({});
  };
  console.log(query);
  
  return (
    <Drawer aria-describedby={undefined} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          type="button"
          className="bg-white w-[7.5rem] border rounded-lg  disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base">
          <span className="size-6 flex items-center justify-center">
            <FontAwesomeIcon className="" icon={faFilterList} />
          </span>
          <span className="font-medium text-base ">Filter</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined} className="bg-white">
        <DrawerHeader className="text-left p-6 flex items-center justify-between">
          <DrawerTitle className="font-bold text-2xl leading-[36px] text-geantSap-primary-500">
            Filters
          </DrawerTitle>
          <Button
            onClick={clearFilters}
            type="button"
            className="bg-white w-[6.5rem]  border rounded-lg  disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base">
            <span className="font-normal  text-sm ">Clear filters</span>
          </Button>
        </DrawerHeader>

        <div className="px-6 overflow-scroll">
          <div className="space-y-3 border-b first:mt-0 mt-6  border-geantSap-primary-5 ">
            <span className="font-semibold  text-base text-geantSap-black">
              Status
            </span>

            <RadioGroup
              onValueChange={(value) => handleStatusChange(value)}
              defaultValue={filter.status}
              className="flex flex-col  gap-4  last:pb-6">
              <div className="flex  items-center space-x-2">
                <RadioGroupItem
                  className="text-geantSap-primary-600 "
                  value="Open"
                  id="Open"
                  checked={filter.status === "Open"}
                />
                <label htmlFor="Open" className="font-normal text-base">
                  Open
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="text-geantSap-primary-600 "
                  value="Closed"
                  id="Closed"
                  checked={filter.status === "Closed"}
                />
                <label htmlFor="Closed" className="font-normal text-base">
                  Close
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="text-geantSap-primary-600 "
                  value="Cancelled"
                  id="Cancelled"
                  checked={filter.status === "Cancelled"}
                />
                <label htmlFor="Cancelled" className="font-normal text-base">
                  Cancel
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 border-b first:mt-0 mt-6  border-geantSap-primary-5 ">
            <span className="font-semibold  text-base text-geantSap-black">
              Receiving Date
            </span>
            <div className="pb-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left  font-normal",
                      !filter.receivingDate && "text-muted-foreground"
                    )}>
                    {filter.receivingDate ? (
                      format(new Date(filter.receivingDate), "PP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <FontAwesomeIcon
                      icon={faCalendarCirclePlus}
                      className="ml-auto text-geantSap-primary-600 h-4 w-4 "
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                  <Calendar
                    mode="single"
                    selected={filter.receivingDate}
                    onSelect={(date) =>
                      handleDateSelect(date ? new Date(date) : undefined)
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <DrawerFooter className=" flex flex-row gap-4 p-6">
          <DrawerClose asChild>
            <Button
              type="button"
              className="bg-white w-[7.5rem] border rounded-lg  disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base">
              <span className="size-6 flex items-center justify-center">
                <FontAwesomeIcon className="" icon={faX} />
              </span>
              <span className="font-medium text-base ">Cancel</span>
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button
              type="submit"
              onClick={() => {
                let queryString = "";

                if (filter.status) {
                  queryString += `&status=${filter.status}`;
                }

                if (filter.receivingDate) {
                  if (queryString) queryString += "&";
                  const formattedDate = format(
                    filter.receivingDate,
                    "yyyy-MM-dd"
                  );
                  queryString += `&${dateFilter}=${formattedDate}`;
                }
                setquery(queryString);
                setOpen(false);
              }}
              className="bg-geantSap-primary-500 w-[7.5rem] disabled:bg-geantSap-gray-50 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base">
              <span className="size-6 flex items-center justify-center">
                <FontAwesomeIcon className="" icon={faCheckDouble} />
              </span>
              <span className="font-medium text-base ">Confirm</span>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GRPOFilter;
