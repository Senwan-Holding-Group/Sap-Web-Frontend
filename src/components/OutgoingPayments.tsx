/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { bankAccountList, cashAccountList } from "@/lib/constants";
import { Input } from "./ui/input";
import { CreateOutgoingPayment } from "@/lib/types";
import { postOutgoingPayments } from "@/api/client";
import { useToast } from "@/lib/hooks/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  outgoingPaymentList: CreateOutgoingPayment | undefined;
};
const OutgoingPayments = ({ outgoingPaymentList }: Props) => {
  const { toast } = useToast();
    const navigate = useNavigate();
  const form = useForm({defaultValues:{
    bankAccount:"",
    cashAccount:"",
    cashAmount:"",
    bankAmount:""
  }});
    useEffect(() => {
      if (outgoingPaymentList) {
        form.reset({
          bankAccount:"",
          cashAccount:"",
          cashAmount:outgoingPaymentList?.cash,
          bankAmount:outgoingPaymentList?.bank
        });
      }
    }, [form,outgoingPaymentList ]);
  const onSubmit = async (values: any) => {
    if (outgoingPaymentList) {
      const newValues = {
        vendorCode: outgoingPaymentList.result.find(
          (invoice) => invoice.vendorCode
        )?.vendorCode,
        documentDate: outgoingPaymentList.result.find(
          (invoice) => invoice.paymentDate
        )?.paymentDate,
        invoiceList: outgoingPaymentList.result.map((invoice, i) => {
          return {
            lineNum: i + 1,
            documentTotal: invoice.documentTotal,
            documentEntry: invoice.docmentEntry,
            invoiceType: invoice.invoiceType,
          };
        }),
        accountList: [
          {
            lineNum: 0,
            accountNum: values.cashAccount,
            amount: outgoingPaymentList.cash,
            type: "cash",
          },
          {
            lineNum: 1,
            accountNum: values.bankAccount,
            amount: outgoingPaymentList.bank,
            type: "bank",
          },
        ],
      };
      newValues.accountList = newValues.accountList.filter(
        (item) => item.amount != "0"
      );
      return postOutgoingPayments(
        "/outgoing-payment/pay",
        navigate,
        newValues,
        toast,
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-geantSap-primary-600 text-white border disabled:opacity-50 border-geantSap-gray-100 rounded-lg">
          Confirm,next
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className=" flex flex-col justify-between 3xl:h-[30rem]  sm:max-w-sm w-[90%] ">
        <div className="px-4 ">
          <DialogHeader className="border-b  border-geantSap-gray-50  md:h-[3.5rem]">
            <DialogTitle className=" flex md:flex-row flex-col  justify-between items-center  py-2 pl-2  pr-4">
              <span className="text-2xl leading-9 font-bold text-geantSap-primary-500">
                Outgoing Payment
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="px-6 pt-8 pb-10  h-full w-full ">
          <Form {...form}>
            <FormField
              control={form.control}
              name="cashAccount"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2 gap-y-2 w-[21.188rem]">
                  <FormLabel className="text-sm font-bold text-geantSap-black">
                    Cash Account
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={form.formState.isSubmitting || outgoingPaymentList?.cash==="0"}>
                      <SelectTrigger className="w-full justify-between rounded-lg disabled:opacity-50  border border-geantSap-gray-50">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="">
                        {cashAccountList.map((account) => (
                          <SelectItem
                            key={account.accountNumber}
                            value={account.accountNumber}>
                            {account.accountNumber + account.accountName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cashAmount"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2 gap-y-2 w-[21.188rem]">
                  <FormLabel className="text-sm font-bold text-geantSap-black">
                    Cash Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}

                      type="number"
                      className="w-full border border-geantSap-gray-50   rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankAccount"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2 gap-y-2 w-[21.188rem]">
                  <FormLabel className="text-sm font-bold text-geantSap-black">
                    Bank Account
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={form.formState.isSubmitting||outgoingPaymentList?.bank==="0"}>
                      <SelectTrigger className="w-full justify-between rounded-lg  border disabled:opacity-50 border-geantSap-gray-50">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="">
                        {bankAccountList.map((account) => (
                          <SelectItem
                            key={account.accountNumber}
                            value={account.accountNumber}>
                            {account.accountNumber + " " + account.accountName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankAmount"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2 gap-y-2 w-[21.188rem]">
                  <FormLabel className="text-sm font-bold text-geantSap-black">
                    Bank Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}

                      type="number"
                      className="w-full border border-geantSap-gray-50    rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
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
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <FontAwesomeIcon className="" icon={faSpinner} spin />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OutgoingPayments;
