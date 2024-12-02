import Pagination from "@/components/ui/Pagination";
import { useNavigate } from "react-router-dom";

const POTable = () => {
  const navigate = useNavigate();
  return (
    <div className=" 3xl:h-[696px] h-[500px]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
      <table className="w-full caption-bottom ">
        <thead className="sticky top-0 w-full bg-geantSap-gray-25">
          <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
            <th className="p-6 rounded-tl-xl ">Vendor code</th>
            <th className="p-6">Vendor name</th>
            <th className="p-6">Delivery date</th>
            <th className="p-6">Status</th>
            <th className="p-6">Document No.</th>
            <th className="p-6">Document date</th>
            <th className="p-6 rounded-tr-xl">Document total</th>
          </tr>
        </thead>
        <tbody className="bg-white [&_tr:last-child]:border-0 ">
       
          
          <tr onClick={()=>navigate(`/purchasing/active-PO/details/${1}`)} className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">V-00001</td>
            <td className="px-6 py-3">زين الحياة</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">Cancelled </td>
            <td className="px-6 py-3">56793</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">12,000.00 LYD</td>
          </tr>
          <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3 whitespace-nowrap">V-00001</td>
            <td className="px-6 py-3 whitespace-nowrap">زين الحياة</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">Cancelled </td>
            <td className="px-6 py-3 whitespace-nowrap">56793</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">12,000.00 LYD</td>
          </tr>
          <tr onClick={()=>navigate(`/purchasing/active-PO/details/${1}`)} className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">V-00001</td>
            <td className="px-6 py-3">زين الحياة</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">Cancelled </td>
            <td className="px-6 py-3">56793</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">12,000.00 LYD</td>
          </tr>
          <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3 whitespace-nowrap">V-00001</td>
            <td className="px-6 py-3 whitespace-nowrap">زين الحياة</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">Cancelled </td>
            <td className="px-6 py-3 whitespace-nowrap">56793</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">12,000.00 LYD</td>
          </tr>
          <tr onClick={()=>navigate(`/purchasing/active-PO/details/${1}`)} className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">V-00001</td>
            <td className="px-6 py-3">زين الحياة</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">Cancelled </td>
            <td className="px-6 py-3">56793</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">12,000.00 LYD</td>
          </tr>
          <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3 whitespace-nowrap">V-00001</td>
            <td className="px-6 py-3 whitespace-nowrap">زين الحياة</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">Cancelled </td>
            <td className="px-6 py-3 whitespace-nowrap">56793</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">12,000.00 LYD</td>
          </tr>
          <tr onClick={()=>navigate(`/purchasing/active-PO/details/${1}`)} className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">V-00001</td>
            <td className="px-6 py-3">زين الحياة</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">Cancelled </td>
            <td className="px-6 py-3">56793</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">12,000.00 LYD</td>
          </tr>
          <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3 whitespace-nowrap">V-00001</td>
            <td className="px-6 py-3 whitespace-nowrap">زين الحياة</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">Cancelled </td>
            <td className="px-6 py-3 whitespace-nowrap">56793</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">12,000.00 LYD</td>
          </tr>
          <tr onClick={()=>navigate(`/purchasing/active-PO/details/${1}`)} className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">V-00001</td>
            <td className="px-6 py-3">زين الحياة</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">Cancelled </td>
            <td className="px-6 py-3">56793</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">12,000.00 LYD</td>
          </tr>
          <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3 whitespace-nowrap">V-00001</td>
            <td className="px-6 py-3 whitespace-nowrap">زين الحياة</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">Cancelled </td>
            <td className="px-6 py-3 whitespace-nowrap">56793</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">12,000.00 LYD</td>
          </tr>
          <tr onClick={()=>navigate(`/purchasing/active-PO/details/${1}`)} className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">V-00001</td>
            <td className="px-6 py-3">زين الحياة</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">Cancelled </td>
            <td className="px-6 py-3">56793</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">12,000.00 LYD</td>
          </tr>
          <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3 whitespace-nowrap">V-00001</td>
            <td className="px-6 py-3 whitespace-nowrap">زين الحياة</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">Cancelled </td>
            <td className="px-6 py-3 whitespace-nowrap">56793</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">12,000.00 LYD</td>
          </tr>
          <tr onClick={()=>navigate(`/purchasing/active-PO/details/${1}`)} className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">V-00001</td>
            <td className="px-6 py-3">زين الحياة</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">Cancelled </td>
            <td className="px-6 py-3">56793</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">12,000.00 LYD</td>
          </tr>
          <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3 whitespace-nowrap">V-00001</td>
            <td className="px-6 py-3 whitespace-nowrap">زين الحياة</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">Cancelled </td>
            <td className="px-6 py-3 whitespace-nowrap">56793</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">12,000.00 LYD</td>
          </tr>
          <tr onClick={()=>navigate(`/purchasing/active-PO/details/${1}`)} className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">V-00001</td>
            <td className="px-6 py-3">زين الحياة</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">Cancelled </td>
            <td className="px-6 py-3">56793</td>
            <td className="px-6 py-3">Mar 31,2025 </td>
            <td className="px-6 py-3">12,000.00 LYD</td>
          </tr>
          <tr className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3 whitespace-nowrap">V-00001</td>
            <td className="px-6 py-3 whitespace-nowrap">زين الحياة</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">Cancelled </td>
            <td className="px-6 py-3 whitespace-nowrap">56793</td>
            <td className="px-6 py-3 whitespace-nowrap">Mar 31,2025 </td>
            <td className="px-6 py-3 whitespace-nowrap">12,000.00 LYD</td>
          </tr>
        </tbody>
        <tfoot className="sticky -bottom-1 w-full">
            <td colSpan={7}>
              <Pagination />
            </td>
        </tfoot>
      </table>
    </div>
  );
};

export default POTable;
