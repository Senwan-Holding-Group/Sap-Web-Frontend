import { POPrintLayoutDocLine } from "@/lib/types";
import { useCallback } from "react";

type TableRow = {
  documentLine: POPrintLayoutDocLine[] | undefined;
  noPrice: boolean;
};
const Table = ({ documentLine, noPrice }: TableRow) => {
  const calculateDocumentTotal = useCallback(() => {
    return documentLine?.reduce((sum, line) => sum + (line.total || 0), 0);
  }, [documentLine]);
  const documentTotal = calculateDocumentTotal();
  const rows = documentLine?.map((item, index) => (
    <tr key={index} className={`even:bg-geantSap-gray-50  `}>
      <td>{index + 1}</td>
      <td>{item.itemCode}</td>
      <td>{item.barcode}</td>
      <td>{item.itemDescription}</td>
      <td>{item.quantity}</td>
      {noPrice && <td>{item.price}</td>}
      <td>{item.uomCode}</td>
      <td>{item.uomGroup}</td>
      {noPrice && <td>{item.total}</td>}
    </tr>
  ));
  return (
    <div className="px-10   ">
      <div className=" bg-whit  ">
        <table className=" w-full *:*:*:py-2.5 text-[12px] text-nowrap  text-justify *:*:*:px-2.5">
          <thead className="mt-3 border-y border-geantSap-black">
            <tr className="">
              <th>NO</th>
              <th>Item Code</th>
              <th>BarCode</th>
              <th>Item Description</th>
              <th>Qty</th>
              {noPrice && <th>Unit Price</th>}
              <th>UOM</th>
              <th>UoM Group</th>
              {noPrice && <th>Total Line</th>}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        {noPrice && (
          <div className=" flex font-semibold mt-2 text-[12px] justify-end ">
            <div className="flex w-[15rem] gap-2">
              <p className=" ">Total Document :- </p>
              <span>{documentTotal?.toFixed(4)}</span>
            </div>
          </div>
        )}
      </div>
    
     
    </div>
  );
};

export default Table;
