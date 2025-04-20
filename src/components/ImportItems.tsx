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
import { Textarea } from "./ui/textarea";
import { DocumentLine } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemImport, ItemImport } from "@/lib/formsValidation";
import { importItems } from "@/api/client";
import { useToast } from "@/lib/hooks/use-toast";
import { useState } from "react";

type Props = {
  setState: React.Dispatch<React.SetStateAction<DocumentLine[]>>;
  Code: string;
  url: string;
};
const ImportItems = ({ setState, Code, url }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  //   const [isPasting, setIsPasting] = useState(false);

  const form = useForm<ItemImport>({
    resolver: zodResolver(itemImport),
    defaultValues: { item: "" },
  });
  const handleClose = () => {
    setOpen(false);
    form.reset();
  };
  const onSubmit = async (values: ItemImport) => {
    const rows = values.item.split("\n");
    const headers = rows[0].split("\t");
    console.log(rows[0]);

    const result = rows
      .slice(1)
      .filter((row) => row.trim().length > 0)
      .map((row) => {
        const cells = row.split("\t");
        return {
          [headers[0].toLowerCase()]: cells[0],
          [headers[1].toLowerCase()]: cells[1],
        };
      });
    console.log(result);
    return importItems(url, result, Code, form, handleClose, setState, toast);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={Code == ""}
          className="text-geantSap-primary-600 bg-white border w-[11.25rem] flex items-center disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 disabled:cursor-not-allowed rounded-lg"
        >
          <span className="size-6 flex items-center justify-center">
            <FontAwesomeIcon className="size-6" icon={faFileImport} />
          </span>
          <span className="font-medium text-base ">Import Items</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className=" sm:max-w-[50rem]  w-[90%]"
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              form.handleSubmit(onSubmit)(e);
            }}
            className="flex flex-col w-full overflow-scroll  justify-between h-full"
          >
            <div className=" flex 3xl:h-[35rem] h-[25rem] bg-[#fcfcfc] rounded-xl overflow-scroll flex-col justify-between w-full  ">
              <div className="px-6  mt-4">
                <DialogHeader className="border-b border-geantSap-gray-50  h-[3.25rem]">
                  <DialogTitle className="text-2xl p-2 leading-9 font-bold text-geantSap-primary-500 ">
                    Import Items
                  </DialogTitle>
                </DialogHeader>
              </div>

              <div className="space-y-4 h-full overflow-y-scroll w-full px-6 py-4">
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paste Items</FormLabel>
                      {/* <Button
                        className="bg-white w-[8.125rem] border  rounded-lg  text-geantSap-primary-600 font-medium text-base"
                        type="button"
                        disabled={isPasting}
                        onClick={async () => {
                          setIsPasting(true);
                          try {
                            const text = await navigator.clipboard.readText();
                            const formattedText = text
                              .split('\n')
                              .filter(line => line.trim().length > 0)
                              .map(line => line.trim())
                              .join('\n');
                      
                            field.onChange(formattedText);
                          } catch (error) {
                            console.log(error);
                            toast({
                              title: "Clipboard Error",
                              description: "Unable to access clipboard. Please check permissions.",
                              variant: "destructive",
                            });
                          } finally {
                            setIsPasting(false);
                          }
                        }}
                      >
                        {isPasting ? (
                          <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                        ) : null}
                        Paste Items
                      </Button> */}
                      <FormControl>
                        <div className="space-y-4">
                          <Textarea
                            disabled={form.formState.isSubmitting}
                            className="h-[5rem]  whitespace-pre font-mono leading-[1.5rem] text-sm p-4"
                            placeholder="Paste your items here."
                            id="message"
                            {...field}
                            onPaste={(e) => {
                              e.preventDefault();
                              const pastedText =
                                e.clipboardData.getData("text");
                              const formattedText = pastedText
                                .split("\n")
                                .filter((line) => line.trim().length > 0)
                                .map((line) => line.trim())
                                .join("\n");

                              field.onChange(formattedText);
                            }}
                          />
                          {field.value && (
                            <div className="border rounded-md overflow-hidden">
                              <table className="w-full ">
                                <thead className="bg-geantSap-gray-25">
                                  <tr>
                                    {field.value
                                      .split("\n")[0]
                                      .split("\t")
                                      .slice(0, 2)
                                      .map((header, i) => (
                                        <th
                                          key={i}
                                          className="px-4 py-2 text-left border-b"
                                        >
                                          {header}
                                        </th>
                                      ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {field.value
                                    .split("\n")
                                    .slice(1)
                                    .filter((row) => row.trim())
                                    .map((row, i) => (
                                      <tr
                                        key={i}
                                        className={i % 2 ? "bg-gray-50" : ""}
                                      >
                                        {row
                                          .split("\t")
                                          .slice(0, 2)
                                          .map((cell, i) => (
                                            <td
                                              key={i}
                                              className="px-4 py-2 border-t"
                                            >
                                              {cell}
                                            </td>
                                          ))}
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className=" bg-[#fcfcfc] w-full rounded-bl-lg p-6  rounded-br-lg  border-t flex justify-center sm:justify-end flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
              {form.formState.errors.root && (
                <div className="text-center text-sm rounded-lg border border-red-500 bg-red-200 w-1/2 p-2">
                  {form.formState.errors.root.message}
                </div>
              )}
              <DialogClose asChild>
                <Button
                  disabled={form.formState.isSubmitting}
                  className="bg-white w-[8.125rem] border rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
                  type="button"
                >
                  Close
                </Button>
              </DialogClose>

              <Button
                disabled={form.formState.isSubmitting}
                className="bg-geantSap-primary-500 w-[8.125rem] disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 rounded-lg font-medium text-base"
                type="submit"
              >
                {form.formState.isSubmitting && (
                  <FontAwesomeIcon icon={faSpinner} spin />
                )}
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportItems;
