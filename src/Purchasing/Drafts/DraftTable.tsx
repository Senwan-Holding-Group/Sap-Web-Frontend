import { getActivePOs } from "@/api/client";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { useStateContext } from "@/context/useStateContext";
import { draftmenu } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePO from "../ActivePO/CreatePO";

const DraftTable = () => {
  const navigate = useNavigate();
  const { setError } = useStateContext();
  const [search, setSearch] = useState({
    searchKey: draftmenu[0].value,
    searchValue: "",
  });

  const {
    data: draftList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["draft",search.searchValue],
    queryFn: () => getActivePOs(`/po/draft?${search.searchKey}=${search.searchValue}&perPage=12`, setError),
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between gap-x-4">
      <Search menuList={draftmenu} setSearch={setSearch} search={search} />
        <CreatePO />
      </div>
      <div className=" 3xl:h-[696px] h-[500px]  border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        <DataRenderer isLoading={isFetching} isError={isError}>
          <table className="w-full caption-bottom ">
            <thead className="sticky top-0 w-full bg-geantSap-gray-25">
              <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                <th className="p-6 rounded-tl-xl ">Document No.</th>
                <th className="p-6 ">Vendor code</th>
                <th className="p-6">Vendor name</th>
                <th className="p-6">Status</th>
                <th className="p-6">Process status</th>
                <th className="p-6">Approval Key</th>
                <th className="p-6 rounded-tr-xl">Approval remark</th>
              </tr>
            </thead>
            <tbody className="bg-white [&_tr:last-child]:border-0 ">
              {!draftList?.length ? (
                <tr className="h-[24rem] 3xl:h-[36rem]">
                  <td colSpan={8} className="text-center ">
                    No data found
                  </td>
                </tr>
              ) : (
                draftList.map((draft) => (
                  <tr key={draft.documentEntry}
                    onClick={() =>
                      navigate(
                        `/purchasing/draft/details/${draft.documentEntry}`
                      )
                    }
                    className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-6 py-3">{draft.documentNumber}</td>
                    <td className="px-6 py-3">{draft.vendorCode}</td>
                    <td className="px-6 py-3">{draft.vendorName}</td>
                    <td className="px-6 py-3">{draft.status} </td>
                    <td className="px-6 py-3">{draft.processStatus} </td>
                    <td className="px-6 py-3">{draft.approvalEntry} </td>
                    <td className="px-6 py-3">{draft.remarks}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="sticky -bottom-1 w-full">
              <tr>
                <td colSpan={7}>
                  <Pagination />
                </td>
              </tr>
            </tfoot>
          </table>
        </DataRenderer>
      </div>
    </div>
  );
};

export default DraftTable;
