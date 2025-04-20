import { useAuth } from "@/api/Auth/useAuth";
import GeantLogo from "/Logo - V.svg";

import { useStateContext } from "@/context/useStateContext";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import DataRenderer from "../DataRenderer";
import { Button } from "../ui/button";
import Table from "./Table";
import moment from "moment";
import { getPOPrintLayout } from "@/api/client";

type Props = {
  title: string;
};
const APPrintLayout = ({title}:Props) => {
      const contentRef = useRef<HTMLDivElement>(null);
      const reactToPrintFn = useReactToPrint({ contentRef });
      const { setError } = useStateContext();
      const { user } = useAuth();
      const { id } = useParams();
      const url =title === "A/P Invoice" ? `/ap/layout/${id}` : `/credit-memo/layout/${id}`;
    
      const {
        data: APPrintLayout,
        isFetching,
        isError,
      } = useQuery({
        queryKey: ["APPrintLayout", id],
        queryFn: () => getPOPrintLayout(url, setError),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      });
  return (
    <DataRenderer isLoading={isFetching} isError={isError}>
    <div  className="flex flex-col h-10">
      <Button
        className="bg-transparent border-b  w-full rounded-none text-geantSap-black p-0"
        onClick={() => reactToPrintFn()}
      >
        {title}
      </Button>
    </div>
    <div ref={contentRef} id="prt" className="print:flex flex-col hidden  h-screen justify-between">
      <div className="flex justify-between  pt-5 px-[5rem]">
        <img
          src={GeantLogo}
          alt="GeantLogo"
          className=" h-[5rem] object-fill "
        />
        <h1 className="text-lg font-bold  self-center ">
        {title}  ({APPrintLayout?.documentNumber})
        </h1>
        <div className="text-[12px] font-bold self-center ">
          <div className="flex gap-2">
            <p className="w-[3.5rem]">Date</p>
            <span>: {moment().format("MM-D-YYYY   h:mm:ss A")}</span>
          </div>
          <div className="flex gap-2">
            <p className="w-[3.5rem]">UserId</p>
            <span>: {user.code}</span>
          </div>
        </div>
      </div>
      <div className="px-[5rem] py-8 flex font-semibold text-[12px]">
        <div className="w-1/3 ">
          <div className="flex gap-2">
            <p className="w-[7rem]">Supplier Code</p>
            <span>: {APPrintLayout?.vendorCode}</span>
          </div>
          <div className="flex gap-2">
            <p className="w-[7rem]">Supplier Name</p>
            <span>: {APPrintLayout?.vendorName}</span>
          </div>

          <div className="flex gap-2">
            <p className="w-[7rem]">Contact Person</p>
            <span>: {APPrintLayout?.contactPerson.contactPerson}</span>
          </div>

          <div className="flex gap-2 ">
            <p className="w-[7rem]">Telephone</p>
            <span>: {APPrintLayout?.telephone}</span>
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex gap-2">
            <p className="w-[8rem]">Order NO</p>
            <span>: {APPrintLayout?.documentNumber}</span>
          </div>

          <div className="flex gap-2">
            <p className="w-[8rem]">Order Date</p>
            <span>: {moment(APPrintLayout?.documentDate).format("D-MMM-YYYY")}</span>
          </div>
          <div className="flex gap-2">
            <p className="w-[8rem]">Shipping Address</p>
            <span>: {APPrintLayout?.shippingAddress}</span>
          </div>
          <div className="flex gap-2">
            <p className="w-[8rem]">Status</p>
            <span>: {APPrintLayout?.status}</span>
          </div>

          <div className="flex gap-2">
            <p className="w-[8rem]">NO of Items</p>
            <span>: {APPrintLayout?.documentLine.length}</span>
          </div>

          <div className="flex gap-2">
            <p className="w-[8rem]">Delivery Date</p>
            <span>: {moment(APPrintLayout?.deliveryDate).format("D-MMM-YYYY")}</span>
          </div>
        </div>
      </div>
      <Table
        noPrice={true}
        documentLine={
          APPrintLayout && APPrintLayout.documentLine
        }
      />
    
    </div>
    
  </DataRenderer>
  )
}

export default APPrintLayout