import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { useReactToPrint } from "react-to-print";
import { PromoItem } from "@/Promotions/Promotions";

type SelectPromotionProps = {
  selectedItems: PromoItem[];
};

const SelectPromotion = ({ selectedItems }: SelectPromotionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<"a4" | "a5" | "a6" | null>(
    null
  );
  const [prevPrice, setPrevPrice] = useState<boolean>(false);
  const reactToPrintFn = useReactToPrint({ contentRef });
  console.log(selectedItems);

  const groupedItems = selectedItems.reduce((groups, item) => {
    const group = item.pageGroup || 1;
    if (!groups[group]) groups[group] = [];
    groups[group].push(item);
    return groups;
  }, {} as Record<number, PromoItem[]>);
  console.log(groupedItems);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!selectedItems.length}
          className="bg-geantSap-primary-500  disabled:opacity-50 rounded-lg">
          Next
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" sm:max-w-[52.125rem]  w-[90%]"
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <div className=" flex 3xl:h-[40.313rem] h-[40rem] bg-[#fcfcfc] rounded-xl overflow-scroll flex-col justify-between w-full  ">
          <div className="px-6  mt-4">
            <DialogHeader className="border-b border-geantSap-gray-50  h-[3.25rem]">
              <DialogTitle className="text-2xl p-2 leading-9 font-bold text-geantSap-primary-500 ">
                Select promotion type
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="space-y-2 h-full flex flex-col w-full  px-6 pt-2 pb-6 ">
            <div className="space-y-3 h-[4.938rem] border-b border-geantSap-primary-25">
              <Label className="font-bold text-sm leading-[100%] h-5 text-geantSap-black">
                Extra elements in the layout
              </Label>
              <div className="flex items-center gap-4  ">
                <Checkbox
                  id="4"
                  checked={prevPrice}
                  onCheckedChange={(checked) => setPrevPrice(checked === true)}
                />
                <Label
                  htmlFor="4"
                  className="font-normal text-base leading-[22.4px]">
                  Display Previous Price
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-sm leading-[100%] h-[1.875rem] flex items-end text-geantSap-black">
                Tap to choose a size
              </Label>
              <div className="flex gap-x-14 ">
                <div
                  onClick={() => setSelectedSize("a4")}
                  className={`bg-white w-1/2 h-[20rem] rounded-[1.25rem] shadow cursor-pointer ${
                    selectedSize === "a4"
                      ? "ring-2 ring-geantSap-primary-500"
                      : ""
                  }`}>
                  <span className="text-geantSap-primary-500 font-bold text-2xl flex justify-center items-center h-12">
                    A4
                  </span>
                  <div className="flex justify-center   items-center h-[17rem]">
                    <img
                      src={"/a4Promo.svg"}
                      className="object-contain "
                      alt="logoaren"
                      title="Geant Sap"
                    />
                  </div>
                </div>
                <div
                  onClick={() => setSelectedSize("a5")}
                  className={`bg-white w-1/2 h-[20rem] rounded-[1.25rem] shadow cursor-pointer ${
                    selectedSize === "a5"
                      ? "ring-2 ring-geantSap-primary-500"
                      : ""
                  }`}>
                  <span className="text-geantSap-primary-500 font-bold text-2xl flex justify-center items-center h-12">
                    A5
                  </span>
                  <div className="flex justify-center  items-center h-[17rem]">
                    <img
                      src={"/a5Promo.svg"}
                      className="object-contain "
                      alt="logoaren"
                      title="Geant Sap"
                    />
                  </div>
                </div>
                <div
                  onClick={() => setSelectedSize("a6")}
                  className={`bg-white w-1/2 h-[20rem] rounded-[1.25rem] shadow cursor-pointer ${
                    selectedSize === "a6"
                      ? "ring-2 ring-geantSap-primary-500"
                      : ""
                  }`}>
                  <span className="text-geantSap-primary-500 font-bold text-2xl flex justify-center items-center h-12">
                    A6
                  </span>
                  <div className="flex justify-center  items-center h-[17rem]">
                    <img
                      src={"/a5Promo.svg"}
                      className="object-contain h-[120px] w-[100px]"
                      alt="logoaren"
                      title="Geant Sap"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div ref={contentRef} className="hidden print:block">
            {selectedSize === "a4" && (
              <>
                {Object.entries(groupedItems).map(([pageGroup, items]) => (
                  <div
                    className="w-full "
                    data-page-group={pageGroup}
                    key={pageGroup}>
                    {/* Front side */}
                    <div className="a4 w-full">
                      <div className="w-full h-[23.15rem] "></div>
                      <div className="h-[47rem] flex flex-col   justify-evenly items-center">
                        {items.slice(0, 3).map((item, i) => (
                          <div
                            key={`front-${pageGroup}-${i}`}
                            className="flex flex-col gap-y-4   text-black items-center">
                            <div className="flex flex-col   gap-y-3 items-center">
                              <span className="font-normal text-5xl">
                                {item.shortName}
                              </span>
                              <span className="font-normal text-3xl">
                                {item.shortForeignName}
                              </span>
                            </div>
                            <span
                              className={`font-semibold  ${
                                prevPrice && item.previousPrices
                                  ? "text-[6.875rem]"
                                  : "text-[8.5rem]"
                              } leading-[0.85]  h-fit flex items-center  justify-center gap-x-2`}>
                              {prevPrice && item.previousPrices ? (
                                <>
                                  {parseFloat(item.currentPrice).toFixed(2)}
                                  <span className="text-xl flex items-end">
                                    LYD
                                  </span>
                                  <span className="text-6xl">/</span>
                                  <span className="line-through">
                                    {parseFloat(item.previousPrices).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                parseFloat(item.currentPrice).toFixed(2)
                              )}
                              <span className="text-xl flex items-end">
                                LYD
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Back side */}
                    <div className="a4">
                      <div className="w-full h-[23.15rem] "></div>
                      <div className="h-[47rem] flex flex-col  justify-evenly items-center">
                        {items.slice(0, 3).map((item, i) => (
                          <div
                            key={`back-${pageGroup}-${i}`}
                            className="flex flex-col gap-y-4  text-black items-center">
                            <div className="flex flex-col  gap-y-3 items-center">
                              <span className="font-normal text-5xl">
                                {item.shortName}
                              </span>
                              <span className="font-normal text-3xl">
                                {item.shortForeignName}
                              </span>
                            </div>
                            <span
                              className={`font-semibold  ${
                                prevPrice && item.previousPrices
                                  ? "text-[6.875rem]"
                                  : "text-[8.5rem]"
                              } leading-[0.85]  h-fit flex items-center  justify-center gap-x-2`}>
                              {prevPrice && item.previousPrices ? (
                                <>
                                  {parseFloat(item.currentPrice).toFixed(2)}
                                  <span className="text-xl flex items-end">
                                    LYD
                                  </span>
                                  <span className="text-6xl">/</span>
                                  <span className="line-through">
                                    {parseFloat(item.previousPrices).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                parseFloat(item.currentPrice).toFixed(2)
                              )}
                              <span className="text-xl flex items-end">
                                LYD
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {selectedSize === "a5" && (
              <div>
                {Object.entries(groupedItems).map(([pageGroup, items]) => (
                  <div
                    className="w-full "
                    data-page-group={pageGroup}
                    key={pageGroup}>
                    {/* Front side */}
                    <div className="a5">
                      <div className="w-full h-[16rem]"></div>
                      <div className="h-[33.625rem] flex flex-col  justify-evenly items-center">
                        {items.slice(0, 3).map((item, i) => (
                          <div
                            key={`front-${pageGroup}-${i}`}
                            className="flex flex-col gap-y-4 text-black items-center">
                            <div className="flex flex-col   gap-y-3 items-center">
                              <span className="font-normal text-4xl">
                                {item.shortName}
                              </span>
                              <span className="font-normal text-2xl">
                                {item.shortForeignName}
                              </span>
                            </div>
                            <span
                              className={`font-semibold  ${
                                prevPrice && item.previousPrices
                                  ? "text-[3.875rem]"
                                  : "text-[4.5rem]"
                              } leading-[0.85]  h-fit flex items-center  justify-center gap-x-2`}>
                              {prevPrice && item.previousPrices ? (
                                <>
                                  {parseFloat(item.currentPrice).toFixed(2)}
                                  <span className="text-sm flex">LYD</span>
                                  <span className="text-3xl">/</span>
                                  <span className="line-through">
                                    {parseFloat(item.previousPrices).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                parseFloat(item.currentPrice).toFixed(2)
                              )}
                              <span className="text-sm flex">LYD</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Back side */}
                    <div className="a5">
                      <div className="w-full h-[16rem]"></div>
                      <div className="h-[33.625rem] flex flex-col justify-evenly items-center">
                        {items.slice(0, 3).map((item, i) => (
                          <div
                            key={`back-${pageGroup}-${i}`}
                            className="flex flex-col  gap-y-4 text-black items-center">
                            <div className="flex flex-col  gap-y-3 items-center">
                              <span className="font-normal text-4xl">
                                {item.shortName}
                              </span>
                              <span className="font-normal text-2xl">
                                {item.shortForeignName}
                              </span>
                            </div>
                            <span
                              className={`font-semibold  ${
                                prevPrice && item.previousPrices
                                  ? "text-[3.875rem]"
                                  : "text-[4.5rem]"
                              } leading-[0.85]  h-fit flex items-center  justify-center gap-x-2`}>
                              {prevPrice && item.previousPrices ? (
                                <>
                                  {parseFloat(item.currentPrice).toFixed(2)}
                                  <span className="text-sm flex items-end">
                                    LYD
                                  </span>
                                  <span className="text-3xl">/</span>
                                  <span className="line-through">
                                    {parseFloat(item.previousPrices).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                parseFloat(item.currentPrice).toFixed(2)
                              )}
                              <span className="text-sm flex items-end">
                                LYD
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedSize === "a6" && (
              <div>
                {Object.entries(groupedItems).map(([pageGroup, items]) => (
                  <div
                    className="w-full"
                    data-page-group={pageGroup}
                    key={pageGroup}>
                    {/* Front side */}
                    <div className="a6">
                      <div className="w-full h-[16rem]"></div>
                      <div className="h-[30.6rem] flex flex-col justify-evenly items-center">
                        {items.slice(0, 3).map((item, i) => (
                          <div
                            key={`front-${pageGroup}-${i}`}
                            className="flex flex-col gap-y-4 text-black items-center">
                            <div className="flex flex-col   gap-y-3 items-center">
                              <span className="font-normal text-4xl">
                                {item.shortName}
                              </span>
                              <span className="font-normal text-2xl">
                                {item.shortForeignName}
                              </span>
                            </div>
                            <span
                              className={`font-semibold  ${
                                prevPrice && item.previousPrices
                                  ? "text-[2.875rem]"
                                  : "text-[3.5rem]"
                              } leading-[0.85]  h-fit flex items-center  justify-center gap-x-2`}>
                              {prevPrice && item.previousPrices ? (
                                <>
                                  {parseFloat(item.currentPrice).toFixed(2)}
                                  <span className="text-sm flex">LYD</span>
                                  <span className="text-xl">/</span>
                                  <span className="line-through">
                                    {parseFloat(item.previousPrices).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                parseFloat(item.currentPrice).toFixed(2)
                              )}
                              <span className="text-sm flex">LYD</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Back side */}
                    <div className="a6">
                      <div className="w-full h-[16rem]"></div>
                      <div className="h-[30.6rem] flex flex-col justify-evenly items-center">
                        {items.slice(0, 3).map((item, i) => (
                          <div
                            key={`back-${pageGroup}-${i}`}
                            className="flex flex-col gap-y-4 text-black items-center">
                            <div className="flex flex-col  gap-y-3 items-center">
                              <span className="font-normal text-4xl">
                                {item.shortName}
                              </span>
                              <span className="font-normal text-2xl">
                                {item.shortForeignName}
                              </span>
                            </div>
                            <span
                              className={`font-semibold  ${
                                prevPrice && item.previousPrices
                                  ? "text-[2.875rem]"
                                  : "text-[3.5rem]"
                              } leading-[0.85]  h-fit flex items-center  justify-center gap-x-2`}>
                              {prevPrice && item.previousPrices ? (
                                <>
                                  {parseFloat(item.currentPrice).toFixed(2)}
                                  <span className="text-sm flex items-end">
                                    LYD
                                  </span>
                                  <span className="text-3xl">/</span>

                                  <span className="line-through">
                                    {parseFloat(item.previousPrices).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                parseFloat(item.currentPrice).toFixed(2)
                              )}
                              <span className="text-sm flex items-end">
                                LYD
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className=" bg-[#fcfcfc] w-full rounded-bl-lg p-6  rounded-br-lg  border-t flex justify-center sm:justify-end flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
            <DialogClose asChild>
              <Button
                className="bg-white w-[8.125rem] border rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
                type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => reactToPrintFn()}
              disabled={!selectedSize}
              className="bg-geantSap-primary-500 w-[8.125rem] disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base"
              type="submit">
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectPromotion;
