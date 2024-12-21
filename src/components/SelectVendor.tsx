import { Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getVendors } from "@/api/client";
import { useStateContext } from "@/context/useStateContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import DataRenderer from "./DataRenderer";
import { useToast } from "@/hooks/use-toast";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { CreatePORequest } from "@/lib/formsValidation";
type SelectVendorProps = {
  field: ControllerRenderProps<CreatePORequest>;
  form: UseFormReturn<CreatePORequest>;
  disable: boolean;
};

const SelectVendor = ({ field, form, disable }: SelectVendorProps) => {
  const [open, setOpen] = useState(false);
  const { setError } = useStateContext();
  const { toast } = useToast();

  const {
    data: vendorsList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => getVendors(`/vendor`, setError, toast),
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    cacheTime: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000, 
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disable}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 "
        >
          {field.value
            ? vendorsList?.find((vendor) => vendor.vendorCode === field.value)
                ?.vendor
            : "Select Vendor..."}
          <ChevronDown className="opacity-50 size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search Vendors..." />
          <CommandList>
            <ScrollArea className="h-[300px] ">
              <DataRenderer isLoading={isFetching} isError={isError}>
                <CommandEmpty>No vendor found.</CommandEmpty>
                <CommandGroup>
                  {vendorsList?.map((vendor) => (
                    <CommandItem
                      {...field}
                      key={vendor.vendorCode}
                      value={vendor.vendorCode}
                      onSelect={() => {
                        form.setValue("vendorCode", vendor.vendorCode);
                        setOpen(false);
                      }}
                    >
                      {vendor.vendor}
                      <Check
                        className={cn(
                          "ml-auto",
                          field.value === vendor.vendorCode
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </DataRenderer>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectVendor;
