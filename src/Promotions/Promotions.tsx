/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api";
import { useAuth } from "@/api/Auth/useAuth";
import SelectPromotion from "@/components/SelectPromotion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/use-toast";
import { cn, numberWithCommas } from "@/lib/utils";
import { faBarcodeRead, faX } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
export type PromoItem = {
  itemCode: string;
  shortName: string;
  shortForeignName: string;
  barCode: string;
  currentPrice: string;
  previousPrices: string;
  count: number;
  selected: boolean;
};
const fetchItemByBarcode = async (barcode: string, whs: string, toast: any) => {
  if (!barcode) return null;
  const baseURL = import.meta.env.VITE_Promotion_Link;
  try {
    const response = await api.get(`${barcode}?warehouse=${whs}`, {
      baseURL: `${baseURL}/promotions`,
    });
    toast({
      className: cn(
        "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: "item added  successfully",
    });
    return response.data as PromoItem;
  } catch (error: any) {
    toast({
      className: cn(
        "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      description:
        error.message === "Network Error"
          ? "Something went wrong check your connection"
          : error.response.data.message,
    });
  }
};
const Promotions = () => {
  const { user } = useAuth();
  const [scannedItems, setScannedItems] = useState<PromoItem[]>([]);
  const [barcode, setBarcode] = useState("");
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const { toast } = useToast();

  const { refetch } = useQuery({
    queryKey: ["item", barcode],
    queryFn: () =>
      fetchItemByBarcode(
        barcode,
        user === null ? "" : user.warehouseCode,
        toast
      ),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (scannedItems.length === 0) {
      setSelectedCount(null);
    }
  }, [scannedItems]);

  const handleScan = async () => {
    if (!barcode.trim()) return;

    const result = await refetch();
    if (result.data) {
      const newItem: PromoItem = {
        ...result.data,
        selected: false,
        count: 1,
      };
      const itemExists = scannedItems.some(
        (item) =>
          item.itemCode === newItem.itemCode || item.barCode === newItem.barCode
      );

      if (itemExists) {
        toast({
          className: cn(
            "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          variant: "destructive",
          description: "Item already exists in the list",
        });
        setBarcode("");
        return;
      }
      setScannedItems((prev) => {
        if (prev.length >= 3) {
          return [...prev.slice(1), newItem];
        }
        return [...prev, newItem];
      });

      setBarcode("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setScannedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectCount = (count: number) => {
    setSelectedCount(count);

    setScannedItems((prev) =>
      prev.map((item, index) => ({
        ...item,
        selected: index < count,
      }))
    );
  };

  const getSelectedItems = () => {
    return scannedItems.filter((item) => item.selected);
  };
  return (
    <div className="h-dvh px-9 pt-9 w-screen gap-y-2 bg-geantSap-bg flex flex-col font-sans">
      <div className="space-y-4 w-full">
        <Label className="font-bold flex items-center h-9 text-2xl leading-[100%] text-geantSap-primary-500">
          Promotion
        </Label>
        <div className="sm:h-[4.8125rem] flex sm:flex-row flex-col gap-y-2  gap-x-16">
          <div className="space-y-2">
            <Label className="font-bold text-sm leading-[100%] text-geantSap-black">
              Scan Item
            </Label>
            <div className=" w-96 h-10 flex items-center px-2 gap-x-1 border border-geantSap-gray-50 rounded-lg">
              <Input
                value={barcode}
                type="text"
                onChange={(e) =>
                  !isNaN(Number(e.target.value)) && setBarcode(e.target.value)
                }
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                placeholder="item code or scan barcode"
                className="border-0 flex-1  placeholder:leading-[140%]  bg-transparent"
              />
              <span className="size-9 flex items-center justify-center">
                <FontAwesomeIcon
                  className="h-5 w-5 text-geantSap-primary-600"
                  icon={faBarcodeRead}
                />
              </span>
            </div>
          </div>
          <div className="space-y-2 h-full flex flex-col ">
            <Label className="font-bold text-sm leading-[100%] h-5 text-geantSap-black">
              Count Items
            </Label>
            <div className="flex items-center h-full gap-x-9">
              <div className="flex items-center gap-4 w-40 ">
                <Checkbox
                  id="1"
                  checked={selectedCount === 1}
                  onCheckedChange={() => handleSelectCount(1)}
                />
                <Label
                  htmlFor="1"
                  className="font-normal text-base leading-[22.4px]">
                  one item
                </Label>
              </div>
              <div className="flex items-center gap-4 w-40">
                <Checkbox
                  id="2"
                  checked={selectedCount === 2}
                  onCheckedChange={() => handleSelectCount(2)}
                  disabled={scannedItems.length < 2}
                />
                <Label
                  htmlFor="2"
                  className="font-normal text-base leading-[22.4px]">
                  two item
                </Label>
              </div>
              <div className="flex items-center gap-4 w-40">
                <Checkbox
                  id="3"
                  checked={selectedCount === 3}
                  onCheckedChange={() => handleSelectCount(3)}
                  disabled={scannedItems.length < 3}
                />
                <Label
                  htmlFor="3"
                  className="font-normal text-base leading-[22.4px]">
                  three item
                </Label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white sm:h-[calc(100dvh-17.813rem)] h-[calc(100dvh-21.563rem)]  border-geantSap-gray-50 rounded-xl flex flex-col justify-between overflow-y-scroll">
          <table className="w-full caption-bottom  ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap *:p-6   text-base  text-left font-bold text-geantSap-gray-600">
                <th className=" rounded-tl-xl">Item Code</th>
                <th>Short name</th>
                <th>Short foreign name</th>
                <th>Barcode</th>
                <th>Current Price</th>
                <th>Previous Price</th>
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
                    <td>{item.itemCode}</td>
                    <td>{item.shortName}</td>
                    <td>{item.shortForeignName}</td>
                    <td>{item.barCode}</td>
                    <td>{numberWithCommas(item.currentPrice)} LYD</td>
                    <td>{numberWithCommas(item.previousPrices)} LYD</td>
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
      <div className="h-[5.5rem] border-t flex justify-end gap-x-4 border-geantSap-gray-50 p-6">
        {/* <Button
          type="button"
          className="bg-transparent text-geantSap-primary-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
          Cancel
        </Button> */}
        <SelectPromotion selectedItems={getSelectedItems()} />
      </div>
    </div>
  );
};

export default Promotions;
