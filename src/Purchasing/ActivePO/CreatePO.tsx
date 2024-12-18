import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { faFileCirclePlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatePOForm from "@/components/forms/CreatePOForm";
const CreatePO = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-geantSap-primary-500 w-[11.25rem] flex items-center rounded-lg">
          <span className="size-6 flex items-center justify-center">
            <FontAwesomeIcon className="" icon={faFileCirclePlus} />
          </span>
          <span className="font-medium text-base ">Create PO</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" sm:max-w-[90rem]  w-[90%]"
        aria-describedby={undefined}
      >
        <div className=" flex 3xl:h-[47.5rem] h-[40rem] overflow-scroll flex-col justify-between w-full  ">
          <div className="px-6  mt-4">
            <DialogHeader className="border-b border-geantSap-gray-50  h-[3.25rem]">
              <DialogTitle className="text-2xl p-2 leading-9 font-bold text-geantSap-primary-500 ">
                New purchase order
              </DialogTitle>
            </DialogHeader>
          </div>
          <CreatePOForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePO;
