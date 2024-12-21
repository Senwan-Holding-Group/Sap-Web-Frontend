import { faGrid2Plus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Search from "./ui/Search";
import { itemMenu } from "@/lib/constants";
import { useState } from "react";
import { DocumentLine } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getItemsByVendor } from "@/api/client";
import { useStateContext } from "@/context/useStateContext";
import DataRenderer from "./DataRenderer";

type ItemSelectProps = {
  state: DocumentLine[];
  setState: React.Dispatch<React.SetStateAction<DocumentLine[]>>;
  vendorCode: string;
};

const ItemSelect = ({ setState, state,vendorCode }: ItemSelectProps) => {
  const { setError } = useStateContext();
  const [search, setSearch] = useState({
    searchKey: itemMenu[0].value,
    searchValue: "",
  });
  const {
    data: itemList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["items",vendorCode, search.searchValue],
    queryFn: () =>
      getItemsByVendor(
        `/item/vendor/${vendorCode}?${search.searchKey}=${search.searchValue}`,
        setError
      ),
    refetchOnWindowFocus: false,
    enabled:vendorCode!=""
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className=" flex items-center justify-start bg-transparent "
        >
          <FontAwesomeIcon
            className="text-geantSap-primary-500"
            icon={faGrid2Plus}
          />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="h-[25rem] flex flex-col justify-between 3xl:h-[27.5rem]  sm:max-w-4xl w-[90%] "
      >
        <div className="p-4 ">
          <DialogHeader className="border-b  border-geantSap-gray-50  md:h-[3.5rem]">
            <DialogTitle className=" flex md:flex-row flex-col  justify-between items-center  py-2 pl-2  pr-4">
              <span className="text-2xl leading-9 font-bold text-geantSap-primary-500">
                Select Item
              </span>

              <Search
                menuList={itemMenu}
                search={search}
                setSearch={setSearch}
              />
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className=" px-4 h-full w-full overflow-scroll">
          <div className="border-2  border-geantSap-gray-25 rounded-lg">
            <DataRenderer isLoading={isFetching} isError={isError}>
              <table className="w-full ">
                <thead className="bg-geantSap-gray-25">
                  <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                    <th className="px-6 py-3 rounded-tl-lg ">Item No.</th>
                    <th className="px-6 py-3">Item description</th>
                    <th className="px-6 py-3 rounded-tr-lg">Barcode</th>
                  </tr>
                </thead>
                <tbody className=" [&_tr:last-child]:border-0">
                  {itemList?.map((item) => (
                    <tr
                      key={item.itemCode}
                      onClick={() => {
                        // if (
                        //   !state.find(
                        //     (value) => value.itemCode === item.itemCode
                        //   )
                        // ) {
                          setState((prev) => [
                            ...prev,
                            { ...item, quantity: 1,  total: parseFloat(item.price.toString()),line:state.length++ },
                          ]);
                        // } else {
                          // const newList=state.filter(
                          //   (value) => value.itemCode != item.itemCode
                          // )
                          // setState(newList)
                        // }
                      }}
                      className={`text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25  cursor-pointer ${
                        state.find(
                          (value) => value.itemCode === item.itemCode
                        ) && "bg-geantSap-primary-15"
                      }`}
                    >
                      <td className="px-6 py-3">{item.itemCode}</td>
                      <td className="px-6 py-3">{item.itemName}</td>
                      <td className="px-6 py-3">
                        {item.barcodeList[0]?.barcode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataRenderer>
          </div>
        </div>
        <DialogFooter className=" bg-[#fcfcfc] rounded-bl-lg p-6  rounded-br-lg  border-t flex flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
          <DialogClose asChild>
            <Button
              onClick={() => setState([])}
              className="bg-white w-[8.125rem] border rounded-lg text-geantSap-primary-600 font-medium text-base"
              type="button"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="bg-geantSap-primary-500 w-[8.125rem] rounded-lg font-medium text-base"
              type="button"
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemSelect;
