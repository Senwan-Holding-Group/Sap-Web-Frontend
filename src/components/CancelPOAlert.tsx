import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
type CancelPOAlertProps = {
  disabled:boolean,
  cancel: () => void;
  title: string;
  description: string;
};
const CancelPOAlert = ({disabled,cancel,title,description}:CancelPOAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} className="bg-transparent text-geantSap-error-600 border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
          {title}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-y-8 w-[35rem]">
        <AlertDialogHeader className="gap-y-8">
          <AlertDialogTitle className="text-lg pb-2 font-bold leading-[21.09px] border-b">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-nowrap text-lg font-normal text-geantSap-black leading-[27px]">
           {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-y-2">
          <AlertDialogCancel  className="w-full hover:text-geantSap-primary-600 bg-white text-geantSap-primary-600">No, back </AlertDialogCancel>
          <AlertDialogAction className="w-full bg-geantSap-error-600 text-white" onClick={()=>{ cancel()}}>Yes, {title}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelPOAlert;
