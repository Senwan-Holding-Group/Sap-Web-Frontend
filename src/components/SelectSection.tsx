/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { sectionList } from "@/lib/constants";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons/faChevronDown";

type SelectSectionProps = {
  field: FieldValues;
  form: UseFormReturn<any>;
  disabled?: boolean;
};
const SelectSection = ({ field, form, disabled }: SelectSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between rounded-lg  border border-geantSap-gray-50"
        >
          {field.value
            ? sectionList?.find(
                (section) => section.sectionCode === field.value
              )?.sectionName
            : "Select"}
          <FontAwesomeIcon
            icon={faChevronDown}
            className="h-4 w-4  text-geantSap-primary-500"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 w-[21.1875rem]" align="start">
        <Command>
          <CommandInput placeholder="Search Sections..." />
          <CommandList>
            <ScrollArea className="h-[300px] ">
              <CommandEmpty>No section found.</CommandEmpty>
              <CommandGroup>
                {sectionList?.map((section) => (
                  <CommandItem
                    {...field}
                    key={section.sectionCode}
                    value={section.sectionCode}
                    onSelect={() => {
                      form.setValue("section", section.sectionCode);
                      setOpen(false);
                    }}
                  >
                    {section.sectionName}
                    <Check
                      className={cn(
                        "ml-auto",
                        field.value === section.sectionCode
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectSection;
