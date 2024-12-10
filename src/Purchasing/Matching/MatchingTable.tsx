import Pagination from "@/components/ui/Pagination";
import { useNavigate } from "react-router-dom";

const MatchingTable = () => {
  const navigate = useNavigate();

  return (
    <div className=" 3xl:h-[696px] h-[500px]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
    <table className="w-full caption-bottom ">
      <thead className="sticky top-0 w-full bg-geantSap-gray-25">
        <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
          <th className="p-6  rounded-tl-xl">Vendor code</th>
          <th className="p-6">Vendor name</th>
          <th className="p-6">Status</th>
          <th className="p-6 rounded-tr-xl">Document date</th>
        </tr>
      </thead>
      <tbody className="bg-white [&_tr:last-child]:border-0 ">
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
        <tr
          onClick={() => navigate(`/purchasing/matching/details/${1}`)}
          className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          <td className="px-6 py-3">V-00001</td>
          <td className="px-6 py-3">زين الحياة</td>
          <td className="px-6 py-3">Unmatched </td>
          <td className="px-6 py-3">Mar 31,2025  </td>

        </tr>
     
 
    
      </tbody>
      <tfoot className="sticky -bottom-1 w-full">
        <tr>
          <td colSpan={7}>
            <Pagination />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  );
};

export default MatchingTable;
