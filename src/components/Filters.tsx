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
  faCheckDouble,
  faFilterList,
  faX,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { filters } from "@/lib/constants";
type FilterProps = {
  setfilter: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  filter: Record<string, string[]>;
};

const Filters = ({ filter, setfilter }: FilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer aria-describedby={undefined} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          type="button"
          className="bg-white w-[7.5rem] border rounded-lg  disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
        >
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
            onClick={() => setfilter({})}
            type="button"
            className="bg-white w-[6.5rem]  border rounded-lg  disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
          >
            <span className="font-normal  text-sm ">Clear filters</span>
          </Button>
        </DrawerHeader>
        <div className="px-6 overflow-scroll">
          {filters.map((value, i) => (
            <div
              key={i}
              className="space-y-3 border-b first:mt-0 mt-6  border-geantSap-primary-5 "
            >
              <span className="font-semibold  text-base text-geantSap-black">
                {value.title}
              </span>
              {value.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 last:pb-6  ">
                  <Checkbox
                    checked={filter[value.title.toLowerCase()]?.includes(item.value)?true:false}
                    onCheckedChange={(checked) => {
                      const labelValue = value.title.toLowerCase(); 
                      if (
                        checked &&
                        !filter[labelValue]?.includes(item.value)
                      ) {
                        setfilter((prev) => ({
                          ...prev,
                          [labelValue]: prev[labelValue]
                            ? [...prev[labelValue], item.value]
                            : [item.value],
                        }));
                      } else if (
                        !checked &&
                        filter[labelValue]?.includes(item.value)
                      ) {
                        setfilter((prev) => ({
                          ...prev,
                          [labelValue]: prev[labelValue].filter(
                            (value) => value !== item.value
                          ),
                        }));
                      }
                    }}
                    id={item.label}
                  />
                  <label
                    htmlFor={item.label}
                    className="font-normal text-base leading-[22.4px]"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>

        <DrawerFooter className=" flex flex-row gap-4 p-6">
          <DrawerClose asChild>
            <Button
              type="button"
              className="bg-white w-[7.5rem] border rounded-lg  disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
            >
              <span className="size-6 flex items-center justify-center">
                <FontAwesomeIcon className="" icon={faX} />
              </span>
              <span className="font-medium text-base ">Cancel</span>
            </Button>
          </DrawerClose>
          <DrawerClose asChild>

          <Button
            type="submit"
            className="bg-geantSap-primary-500 w-[7.5rem] disabled:bg-geantSap-gray-50 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base"
          >
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

export default Filters;
