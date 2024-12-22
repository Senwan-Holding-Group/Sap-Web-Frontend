import { Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useMemo, useState } from "react";
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
const ITEMS_PER_PAGE = 100; // Number of items to show at once

const SelectVendor = ({ field, form, disable }: SelectVendorProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
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

  // Filter and slice vendors based on search and display count
  const displayedVendors = useMemo(() => {
    if (!vendorsList) return [];
    
    const filtered = searchTerm
      ? vendorsList.filter((vendor) =>
          vendor.vendor.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : vendorsList;

    return filtered.slice(0, displayCount);
  }, [vendorsList, searchTerm, displayCount]);

  // Handle scroll to load more
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop <= clientHeight * 1.5;
    const hasMore = displayCount < (vendorsList?.length || 0);

    if (isNearBottom && hasMore) {
      setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, vendorsList?.length || 0));
    }
  };

  // Debounced search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setDisplayCount(ITEMS_PER_PAGE); // Reset display count when searching
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disable}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400"
        >
          {field.value
            ? vendorsList?.find((vendor) => vendor.vendorCode === field.value)
                ?.vendor
            : "Select Vendor..."}
          <ChevronDown className="opacity-50 size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput 
            placeholder="Search Vendors..." 
            value={searchTerm}
            onValueChange={handleSearch}
          />
          <CommandList>
            <ScrollArea 
              className="h-[300px]" 
              onScroll={handleScroll}
            >
              <DataRenderer isLoading={isFetching} isError={isError}>
                <CommandEmpty>No vendor found.</CommandEmpty>
                <CommandGroup>
                  {displayedVendors.map((vendor) => (
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
                  {displayCount < (vendorsList?.length || 0) && (
                    <CommandItem className="text-center text-sm text-gray-500">
                      Scroll to load more
                    </CommandItem>
                  )}
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
