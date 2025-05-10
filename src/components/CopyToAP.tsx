import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { CopyToAPFormSchema, CopyToAPInvoice } from "@/lib/formsValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { useToast } from "@/lib/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { copyToAp, copyToCreditMemo } from "@/api/client";
import Loader from "./ui/Loader";
type Props = {
  disabled: boolean;
  docEntry: string | undefined;
  title: string;
};
const CopyToAP = ({ disabled, docEntry, title }: Props) => {
  const { toast } = useToast()
  const queryClient = useQueryClient();

  const form = useForm<CopyToAPInvoice>({
    resolver: zodResolver(CopyToAPFormSchema),
    defaultValues: {
      remark: "",
    },
  });

  const onSubmit = async (values: CopyToAPInvoice) => {
    console.log(values);
    return title === "Copy to A/P"
      ? copyToAp(docEntry, values, form, toast, queryClient)
      : copyToCreditMemo(docEntry, values, form, toast, queryClient);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          aria-disabled={disabled}
          className="bg-geantSap-primary-500 disabled:opacity-50 w-[11.25rem] flex items-center rounded-lg">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" sm:max-w-[40rem]  w-[90%]"
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <div className=" flex 3xl:h-[17.5rem] h-[20rem] bg-[#fcfcfc] rounded-xl overflow-scroll flex-col justify-between w-full  ">
          <div className="px-6  mt-4">
            <DialogHeader className="border-b border-geantSap-gray-50  h-[3.25rem]">
              <DialogTitle className="text-2xl p-2 leading-9 font-bold text-geantSap-primary-500 ">
                {title}
              </DialogTitle>
            </DialogHeader>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full overflow-scroll   justify-between h-full">
              <Loader enable={form.formState.isSubmitting} />

              <div className="p-6">
                <FormField
                  control={form.control}
                  name="remark"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-2">
                      <FormLabel className="text-sm font-bold text-geantSap-black">
                        Remark
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Comment"
                          className="h-10   border border-geantSap-gray-50 p-2 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" bg-[#fcfcfc] w-full rounded-bl-lg p-6  rounded-br-lg  border-t flex justify-center sm:justify-end flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
                <DialogClose asChild>
                  <Button
                    disabled={form.formState.isSubmitting}
                    onClick={() => {
                      form.reset();
                    }}
                    className="bg-white w-[8.125rem] border rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
                    type="button">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  disabled={form.formState.isSubmitting}
                  className="bg-geantSap-primary-500 w-[8.125rem] disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base"
                  type="submit">
                  {form.formState.isSubmitting && (
                    <FontAwesomeIcon className="" icon={faSpinner} spin />
                  )}
                  Confirm
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CopyToAP;
