import { postAllRebate } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  faCalendarCirclePlus,
  faSpinner,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
type Props = {
  disabled: boolean;
  paymentDate: string;
  setRebateData: React.Dispatch<
    React.SetStateAction<
      [
        {
          vendor: string;
          res: string;
        }
      ]
    >
  >;
};
const CalculateRebateAll = ({
  disabled,
  paymentDate,
  setRebateData,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const queryClient = useQueryClient();
  const [isSubmitting, setisSubmitting] = useState(false);
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          type="button"
          className="bg-transparent text-geantSap-primary-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
          Rebate
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className=" flex flex-col justify-between w-[90%]  sm:w-[35rem] ">
        <div className="p-4 ">
          <DialogHeader className="border-b  border-geantSap-gray-50  md:h-[3.5rem]">
            <DialogTitle className=" flex md:flex-row flex-col  justify-between items-center  py-2 pl-2  pr-4">
              <span className="text-2xl leading-9 font-bold text-geantSap-primary-500">
                Calculate Rebate All
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="  flex flex-col items-center justify-center gap-y-4 px-4 h-36 w-full  ">
          <span className="text-base font-normal text-geantSap-gray-500">
            Select a date to calculate Rebate
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " md:w-[22rem] w-full  pl-3 text-left  font-normal",
                  !selectedDate && "text-muted-foreground"
                )}>
                {selectedDate ? (
                  format(selectedDate, "PP")
                ) : (
                  <span>Pick a date</span>
                )}
                <FontAwesomeIcon
                  icon={faCalendarCirclePlus}
                  className=" text-geantSap-primary-600 h-6 w-6 "
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 " align="start">
              <Calendar
                selected={selectedDate}
                mode="single"
                onSelect={(date) => setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter className=" bg-[#fcfcfc] rounded-bl-lg p-6  rounded-br-lg  border-t flex flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
          <DialogClose asChild>
            <Button
              disabled={isSubmitting}
              className="bg-white w-[8.125rem] border rounded-lg disabled:opacity-50 text-geantSap-primary-600 font-medium text-base"
              type="button">
              Close
            </Button>
          </DialogClose>
          <Button
            className="bg-geantSap-primary-500 w-[8.125rem] disabled:opacity-50 rounded-lg font-medium text-base"
            onClick={() => {
              postAllRebate(
                `/outgoing-payment/rebate?selectedDate=${format(
                  selectedDate!,
                  "yyyy-MM-dd"
                )}&paymentDate=${format(paymentDate,"dd.MM.yyyy")}`,
                setisSubmitting,
                toast,
                queryClient,
                setRebateData
              );
            }}
            disabled={isSubmitting || !selectedDate}>
            {isSubmitting && (
              <FontAwesomeIcon className="" icon={faSpinner} spin />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalculateRebateAll;
