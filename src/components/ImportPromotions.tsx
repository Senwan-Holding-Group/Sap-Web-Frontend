/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { faFileImport, faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/lib/hooks/use-toast";
import { cn, numberWithCommas } from "@/lib/utils";
import * as XLSX from "xlsx";
import { PromoItem } from "@/Promotions/Promotions";

type ImportPromotionsProps = {
  onImport: (items: PromoItem[]) => void;
};

const ImportPromotions = ({ onImport }: ImportPromotionsProps) => {
  const [open, setOpen] = useState(false);
  const [importedItems, setImportedItems] = useState<PromoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const validatePageGroups = (
    items: PromoItem[]
  ): { valid: boolean; message?: string } => {
    const groupCounts: Record<number, number> = {};

    items.forEach((item) => {
      const group = item.pageGroup;
      groupCounts[group] = (groupCounts[group] || 0) + 1;
    });

    const invalidGroups = Object.entries(groupCounts)
      .filter(([, count]) => count > 3)
      .map(([group]) => group);
    console.log("groupCounts", groupCounts);
    console.log("groupCounts", Object.entries(groupCounts));
    console.log("invalidGroups", invalidGroups);
    if (invalidGroups.length > 0) {
      return {
        valid: false,
        message: `Page group(s) ${invalidGroups.join(
          ", "
        )} exceed the maximum of 3 items per page`,
      };
    }
    

    return { valid: true };
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as string[][];

      if (jsonData.length < 2) {
        throw new Error(
          "Excel file must contain headers and at least one data row"
        );
      }

      const headers = jsonData[0];
      const requiredHeaders = [
        "shortName",
        "shortForeignName",
        "currentPrice",
        "previousPrices",
        "pageGroup",
      ];

      const missingHeaders = requiredHeaders.filter(
        (header) =>
          !headers.some((h) => h.toLowerCase() === header.toLowerCase())
      );

      if (missingHeaders.length > 0) {
        throw new Error(
          `Missing required columns: ${missingHeaders.join(", ")}`
        );
      }

      const items: PromoItem[] = jsonData
        .slice(1)
        .filter((row) =>
          row.some((cell) => cell !== null && cell !== undefined && cell !== "")
        )
        .map((row) => {
          const item: Record<string, string> = {};
          headers.forEach((header, i) => {
            const key = header.toString().toLowerCase();
            item[key] = row[i] || "";
          });

          return {
            shortName: item.shortname || "",
            shortForeignName: item.shortforeignname || "",
            currentPrice: item.currentprice?.toString() || "0",
            previousPrices: item.previousprices?.toString() || "0",
            pageGroup: item.pagegroup ? Number(item.pagegroup) : 1,
          } as PromoItem;
        });
      const validation = validatePageGroups(items);
      if (!validation.valid) {

        throw new Error(validation.message);
      }
      setImportedItems(items);
      toast({
        className: cn(
          "top-0 right-0 bg-geantSap-primary-25 text-geantSap-primary-600 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: `Successfully imported ${items.length} items`,
      });
    } catch (error: any) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast({
        className: cn(
          "top-0 right-0 flex left-1/2 -translate-x-1/2 fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        description: error.message || "Failed to import Excel file",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    onImport(importedItems);
    setOpen(false);
    setImportedItems([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImportedItems([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-geantSap-primary-600 bg-white border w-[11.25rem] flex items-center rounded-lg">
          <span className="size-6 flex items-center justify-center">
            <FontAwesomeIcon className="size-6" icon={faFileImport} />
          </span>
          <span className="font-medium text-base">Import Excel</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[70rem] w-[90%]"
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}>
        <div className="flex 3xl:h-[40rem] h-[35rem] bg-[#fcfcfc] rounded-xl overflow-scroll flex-col justify-between w-full">
          <div className="px-6 mt-4">
            <DialogHeader className="border-b border-geantSap-gray-50 h-[3.25rem]">
              <DialogTitle className="text-2xl p-2 leading-9 font-bold text-geantSap-primary-500">
                Import Promotions from Excel
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="space-y-4 h-full overflow-y-scroll w-full px-6 py-4">
            <div className="space-y-2">
              <Label className="font-bold text-sm leading-[100%] text-geantSap-black">
                Select Excel File
              </Label>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="w-full"
              />
              <p className="text-sm text-geantSap-gray-600">
                Excel file should contain columns: shortName, shortForeignName,
                currentPrice, previousPrices ,pageGroup
              </p>
            </div>

            {importedItems.length > 0 && (
              <div className="bg-white border border-geantSap-gray-50 rounded-xl overflow-scroll">
                <table className="w-full caption-bottom">
                  <thead className="bg-geantSap-gray-25">
                    <tr className="text-nowrap *:p-4 text-base text-left font-bold text-geantSap-gray-600">
                      <th className="rounded-tl-xl">Short Name</th>
                      <th>Short Foreign Name</th>
                      <th>Current Price</th>
                      <th>Previous Price</th>
                      <th className="rounded-tr-xl">Page Group</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {importedItems.map((item, index) => (
                      <tr
                        key={index}
                        className="*:px-4 *:py-3 text-geantSap-black text-nowrap font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100">
                        <td>{item.shortName}</td>
                        <td>{item.shortForeignName}</td>
                        <td>{numberWithCommas(item.currentPrice)} LYD</td>
                        <td>{numberWithCommas(item.previousPrices)} LYD</td>
                        <td> {item.pageGroup} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-[#fcfcfc] w-full rounded-bl-lg p-6 rounded-br-lg border-t flex justify-center sm:justify-end flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
            <DialogClose asChild>
              <Button
                onClick={handleClose}
                disabled={isLoading}
                className="bg-white w-[8.125rem] border rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
                type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={handleConfirm}
              disabled={isLoading || importedItems.length === 0}
              className="bg-geantSap-primary-500 w-[8.125rem] disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base"
              type="button">
              {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportPromotions;
