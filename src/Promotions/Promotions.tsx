// import api from "@/api";
// import { useAuth } from "@/api/Auth/useAuth";
import SelectPromotion from "@/components/SelectPromotion";
import ImportPromotions from "@/components/ImportPromotions";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/use-toast";
import { cn, numberWithCommas } from "@/lib/utils";
import { faX } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export type PromoItem = {
  shortName: string;
  shortForeignName: string;
  currentPrice: string;
  previousPrices: string;
  pageGroup: number;
};

const Promotions = () => {
  const [scannedItems, setScannedItems] = useState<PromoItem[]>([]);
  const { toast } = useToast();
  const handleRemoveItem = (index: number) => {
    setScannedItems((prev) => prev.filter((_, i) => i !== index));
  };
  const handlePageGroupChange = (index: number, pageGroup: number) => {
    const itemsInGroup = scannedItems.filter(
      (item) => item.pageGroup === pageGroup
    ).length;
    console.log("itemsInGroup", itemsInGroup);
    
    if (scannedItems[index].pageGroup !== pageGroup && itemsInGroup >= 3) {
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: `Page group ${pageGroup} already has the maximum of 3 items per  page`,
      });
      return;
    }

    setScannedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, pageGroup } : item))
    );
  };
  const handleImportItems = (items: PromoItem[]) => {
    setScannedItems(items);
    if (items.length > 0) {
      toast({
        className: cn(
          "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: `${items.length} items imported successfully`,
      });
    }
  };

  return (
    <div className="h-dvh  px-9 pt-9 w-screen gap-y-2 bg-geantSap-bg flex flex-col font-sans">
      <div className="space-y-4 w-full">
        <Label className="font-bold flex items-center h-9 text-2xl leading-[100%] text-geantSap-primary-500">
          Promotion
        </Label>
        <Label className="font-bold text-sm leading-[100%] text-geantSap-black">
          Page Group Information
        </Label>
        <div className="bg-white sm:h-[calc(100dvh-14.5rem)] h-[calc(100dvh-18rem)] border  border-geantSap-gray-50 rounded-xl flex flex-col justify-between overflow-y-scroll">
          <table className="w-full caption-bottom  ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap *:p-6   text-base  text-left font-bold text-geantSap-gray-600">
                {/* <th className=" rounded-tl-xl">Item Code</th> */}
                <th className=" rounded-tl-xl">Short name</th>
                <th>Short foreign name</th>
                {/* <th>Barcode</th> */}
                <th>Current Price</th>
                <th>Previous Price</th>
                <th>Page Group</th>
                <th className=" rounded-tr-xl">Remove item</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {!scannedItems?.length ? (
                <tr className=" ">
                  <td colSpan={7} className="text-center p-6 ">
                    Enter Items to create a new promotion
                  </td>
                </tr>
              ) : (
                scannedItems.map((item, index) => (
                  <tr
                    key={index}
                    className="*:px-6 *:py-3 text-geantSap-black text-nowrap font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                    {/* <td>{item.itemCode}</td> */}
                    <td>{item.shortName}</td>
                    <td>{item.shortForeignName}</td>
                    {/* <td>{item.barCode}</td> */}
                    <td>{numberWithCommas(item.currentPrice)} LYD</td>
                    <td>{numberWithCommas(item.previousPrices)} LYD</td>
                    <td>
                      <Input
                        type="number"
                        value={item.pageGroup}
                        onChange={(e) =>
                          handlePageGroupChange(index, Number(e.target.value))
                        }
                        className="w-20 h-8"
                        min="1"
                      />
                    </td>
                    <td>
                      <Button
                        type="button"
                        size={"icon"}
                        onClick={() => handleRemoveItem(index)}
                        className=" flex p-0  items-center disabled:opacity-50 justify-center bg-transparent ">
                        <FontAwesomeIcon
                          className="text-geantSap-error-500"
                          icon={faX}
                        />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-[5.5rem] border rounded-br-xl rounded-bl-xl flex justify-between items-center border-geantSap-gray-50 p-6">
        <ImportPromotions onImport={handleImportItems} />
        <SelectPromotion selectedItems={scannedItems} />
      </div>
    </div>
  );
};

export default Promotions;
