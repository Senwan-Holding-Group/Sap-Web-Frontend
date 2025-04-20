import CreateCreditNoteForm from "@/components/forms/CreateCreditNoteForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Vendor } from "@/lib/types";
type VendorProps = {
  vendorDetails: Vendor | undefined;
};
const CreateCreditNote = ({vendorDetails}:VendorProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-geantSap-primary-500 font-medium text-base  w-[11.25rem] flex items-center rounded-lg">
          Create credit note
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" sm:max-w-[50rem]  w-[90%]"
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <div className=" flex 3xl:h-[37.5rem] h-[30rem] bg-[#fcfcfc] rounded-xl overflow-scroll flex-col justify-between w-full  ">
          <div className="px-6  mt-4">
            <DialogHeader className="border-b border-geantSap-gray-50  h-[3.25rem]">
              <DialogTitle className="text-2xl p-2 leading-9 font-bold text-geantSap-primary-500 ">
                Create credit note
              </DialogTitle>
            </DialogHeader>
          </div>
          <CreateCreditNoteForm vendorDetails={vendorDetails}/>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCreditNote;
