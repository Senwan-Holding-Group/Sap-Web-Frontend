import { baseURL } from "@/api";
import { useAuth } from "@/api/Auth/useAuth";
import Search from "@/components/ui/Search";
import { alertsMenu } from "@/lib/constants";
import { AlertData } from "@/lib/types";
import { faMessageExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AlertContent from "./AlertContent";
import { useQuery } from "@tanstack/react-query";
import { checkAlert } from "@/api/client";
import { capitalize } from "@/lib/utils";

const AlertsTable = () => {
  const [isError, setisError] = useState(false);
  const [data, setData] = useState<AlertData[]>([]);
  const { token } = useAuth();

  const [search, setSearch] = useState({
    searchKey: alertsMenu[0].value,
    searchValue: "",
  });
  const { data: status } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => checkAlert(`/alerts`),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  useEffect(() => {
    if (status === 200) {
      const evtSource = new EventSource(
        `${baseURL}/alerts/stream?token=${token}`
      );
      evtSource.onerror = () => {
        setisError(false);
      };
      evtSource.onmessage = (event) => {
        if (event.data) {
          console.log(JSON.parse(event.data));
          setData(JSON.parse(event.data));
        }
      };
      return () => evtSource.close();
    }
  });
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-8">
        <div className="text-red-500 h-20 w-20 mb-4">
          <FontAwesomeIcon
            className="h-full w-full"
            icon={faMessageExclamation}
          />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Something went wrong
          </h3>
          <div className="bg-geantSap-error-50 text-geantSap-error-500 hover:bg-geantSap-error-100  rounded-lg p-4 max-w-md">
            Check your Connection
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex sm:justify-between items-center flex-col sm:flex-row  gap-4">
        <Search menuList={alertsMenu} setSearch={setSearch} search={search} />
      </div>
      <div className=" 3xl:h-[47.5rem] sm:h-[34.5rem] h-[52rem] max-h-[52rem] border-geantSap-gray-25 rounded-xl block overflow-y-scroll">
        <table className="w-full caption-bottom">
          <thead className="sticky top-0 w-full bg-geantSap-gray-25">
            <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
              <th className="p-6  rounded-tl-xl">Message</th>
              <th className="p-6">Date</th>
              <th className="p-6 rounded-tr-xl">Display Content</th>
            </tr>
          </thead>
          <tbody className="bg-white [&_tr:last-child]:border-0 ">
            {!data?.length ? (
              <tr className="h-[24rem] 3xl:h-[36rem]">
                <td colSpan={3} className="text-center ">
                  waiting for data...
                </td>
              </tr>
            ) : (
              data.map((alert, i) => (
                <tr
                  key={i}
                  className="text-geantSap-black text-nowrap font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-default"
                >
                  <td className="px-6 py-3">{capitalize(alert.message)
                              .replace(/([A-Z])/g, " $1")
                              .trim()}</td>
                  <td className="px-6 py-3">{alert.alertTime} </td>
                  <td className="px-6 py-0 hover:cursor-pointer">
                    <AlertContent key={i} data={alert.data} message={alert.message} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertsTable;
