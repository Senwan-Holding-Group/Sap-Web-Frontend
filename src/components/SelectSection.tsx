import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronDown } from "lucide-react";
import { sectionList } from "@/lib/constants";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { CreatePORequest } from "@/lib/formsValidation";

type SelectSectionProps = {
  field: ControllerRenderProps<CreatePORequest>;
  form: UseFormReturn<CreatePORequest>;
  disabled?:boolean
};
const SelectSection = ({field,form,disabled}:SelectSectionProps) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between rounded-lg disabled:bg-geantSap-gray-25  disabled:text-geantSap-gray-400"
          >
            {field.value
              ? sectionList?.find((section) => section.sectionCode === field.value)
                  ?.sectionName
              : "Select Section..."}
            <ChevronDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command >
            <CommandInput
              
              placeholder="Search Sections..."
            />
            <CommandList >
              <ScrollArea  className="h-[300px] ">
                <CommandEmpty >No section found.</CommandEmpty>
                <CommandGroup >
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
}

export default SelectSection