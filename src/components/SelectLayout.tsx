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

const SelectLayout = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="bg-transparent text-geantSap-primary-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
          Save PO as
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="h-[25rem] flex flex-col justify-between 3xl:h-[27.5rem]  sm:max-w-3xl w-[90%] "
      >
        <div className="p-4 ">
          <DialogHeader className="border-b  border-geantSap-gray-50  md:h-[3.5rem]">
            <DialogTitle className=" flex md:flex-row flex-col  justify-between items-center  py-2 pl-2  pr-4">
              <span className="text-2xl leading-9 font-bold text-geantSap-primary-500">
                Select Layout
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className=" px-4 h-full w-full overflow-scroll">
          <div className="border-2 h-full bg-white border-geantSap-gray-25 rounded-lg">
            
          </div>
        </div>
        <DialogFooter className=" bg-[#fcfcfc] rounded-bl-lg p-6  rounded-br-lg  border-t flex flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
          <DialogClose asChild>
            <Button
              onClick={() => {}}
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

export default SelectLayout;