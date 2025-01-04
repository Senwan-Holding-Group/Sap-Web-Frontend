/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { capitalize } from "@/lib/utils";
import {
  faArrowUpRightFromSquare,
  faMemoCircleInfo,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
type Props = {
  data: any;
  message: string;
};
const AlertContent = ({ data, message }: Props) => {
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FontAwesomeIcon
          className="text-geantSap-primary-500 size-[1.125rem]"
          icon={faMemoCircleInfo}
        />
      </DialogTrigger>
      <DialogContent
        className=" sm:max-w-[70rem]  w-[90%]"
        aria-describedby={undefined}
      >
        <div className=" flex 3xl:h-[40rem] h-[30rem] bg-[#fcfcfc] rounded-xl overflow-scroll flex-col   gap-y-4  w-full ">
          <div className="px-6  mt-4">
            <DialogHeader className="border-b border-geantSap-gray-50  h-[3.25rem]">
              <DialogTitle className="text-2xl p-2 leading-9 font-bold text-geantSap-primary-500 ">
                Alert Content
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="px-6 flex gap-2 sm:flex-row flex-col items-center">
            <h1 className="font-medium text-base text-black">
              Alert message :
            </h1>
            <p className="font-normal text-base leading-[22.4px]">{capitalize(message)
                              .replace(/([A-Z])/g, " $1")
                              .trim()}</p>
          </div>

          <div className="px-6 max-w-full overflow-scroll  h-full ">
            <table className="w-full caption-bottom">
              <thead className="sticky top-0 w-full bg-geantSap-gray-25">
                <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
                  {Object.keys(data[0])?.map((key, i) => {
                    const currentKey = Object.keys(data[0])[i];

                    return (
                      <>
                        {currentKey != "type" && (
                          <th key={key} className="p-6  first:rounded-tl-xl">
                            {capitalize(key)
                              .replace(/([A-Z])/g, " $1")
                              .trim()}
                          </th>
                        )}
                      </>
                    );
                  })}
                  <th className="p-6 rounded-tr-xl">View</th>
                </tr>
              </thead>
              <tbody className="bg-white [&_tr:last-child]:border-0 ">
                {!data?.length ? (
                  <tr className="h-[15rem] 3xl:h-[20rem]">
                    <td colSpan={3} className="text-center ">
                      waiting for data...
                    </td>
                  </tr>
                ) : (
                  data.map((line: any, index: number) => (
                    <tr
                      key={index}
                      className="text-geantSap-black text-nowrap font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-default"
                    >
                      {Object.values(line).map((value: any, i: number) => {
                        const currentKey = Object.keys(data[0])[i];
                        return (
                          <>
                            {currentKey != "type" && (
                              <td key={i} className="px-6 py-3">
                                {currentKey === "documentDate"
                                  ? value.split(" ")[0]
                                  : value}
                              </td>
                            )}
                          </>
                        );
                      })}
                      <td
                        onClick={() =>
                          line.type === "po"
                            ? navigate(
                                `/sap/purchasing/draft/details/${line.documentEntry}`
                              )
                            : navigate(`/sap/items/details/${line.itemCode}`)
                        }
                        className="px-6"
                      >
                        <FontAwesomeIcon
                          className="size-[1.125rem] text-geantSap-primary-500 cursor-pointer"
                          icon={faArrowUpRightFromSquare}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className=" bg-[#fcfcfc] w-full rounded-bl-lg p-6 rounded-br-lg  border-t flex justify-center sm:justify-end flex-row gap-4 h-[5.5rem] border-geantSap-gray-50">
            <DialogClose asChild>
              <Button
                className="bg-white w-[8.125rem] border rounded-lg disabled:bg-geantSap-gray-25 disabled:text-geantSap-gray-400 text-geantSap-primary-600 font-medium text-base"
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertContent;
