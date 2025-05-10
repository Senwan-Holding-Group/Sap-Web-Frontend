import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import * as XLSX from "xlsx";

type ShowRebateProps = {
  rebateData: {
    vendor: string;
    res: string;
  }[];
};
const ShowRebate = ({ rebateData }: ShowRebateProps) => {
  const handleExportToExcel = () => {
    const timestamp = new Date().toISOString().split("T")[0];
    const headers = [
      { header: "Vendor Name", key: "vendor" },
      { header: "Result", key: "res" },
    ];
console.log(headers.map((h) => h.key));
console.log([headers.map((h) => h.header)]);

    const worksheet = XLSX.utils.json_to_sheet(rebateData, {
      header: headers.map((h) => h.key),
      skipHeader: true,
    });
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map((h) => h.header)], {
      origin: "A1",
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rebate Data");
    XLSX.writeFile(workbook, `rebate_data_${timestamp}.xlsx`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          disabled={rebateData.length === 0 || rebateData[0].vendor === ""}
          className="bg-transparent text-geantSap-primary-600  border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
          Show Rebate
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className=" flex flex-col justify-between 3xl:h-[40rem] h-[35rem] sm:max-w-7xl w-[90%] ">
        <div className="px-4 ">
          <DialogHeader className="border-b  border-geantSap-gray-50  md:h-[3.5rem]">
            <DialogTitle className=" flex md:flex-row flex-col  justify-between items-center  py-2 pl-2  pr-4">
              <span className="text-2xl leading-9 font-bold text-geantSap-primary-500">
                Rebate Result
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="px-6 pt-8 pb-10  h-full w-full overflow-scroll flex flex-col gap-4">
          {rebateData.map((data, index) => (
            <div key={index} className="flex flex-col gap-2 ">
              <p className="text-geantSap-gray-900 text-base font-medium leading-6">
                Vendor : {data.vendor}
              </p>
              <p className="text-geantSap-gray-900 text-base font-medium leading-6">
                Result : {data.res}
              </p>
            </div>
          ))}
        </div>
        <DialogFooter className=" bg-[#fcfcfc] rounded-bl-lg p-6  rounded-br-lg  border-t flex flex-row items-center  gap-4 h-[5.5rem] border-geantSap-gray-50">
          <DialogClose asChild>
            <Button
              className="bg-white w-[8.125rem] border rounded-lg text-geantSap-primary-600 font-medium text-base"
              type="button">
              Close
            </Button>
          </DialogClose>
          <Button
            className="bg-geantSap-primary-500 w-[8.125rem] disabled:opacity-50 rounded-lg font-medium text-base"
            type="button"
            onClick={handleExportToExcel}>
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowRebate;
