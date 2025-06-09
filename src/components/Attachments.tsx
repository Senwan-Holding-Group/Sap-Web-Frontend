import { AttachmentList } from "@/lib/types";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/pro-solid-svg-icons";
import { downloadAttachments } from "@/api/client";
import { useState } from "react";
import { useToast } from "@/lib/hooks/use-toast";
type AttachmentProp = {
  attachmentList: AttachmentList[] | undefined;
};
const Attachments = ({ attachmentList }: AttachmentProp) => {
   const [isLoading, setIsLoading] = useState(false);
  
    const { toast } = useToast();
  
  return (
    <table className="w-full ">
      <thead className="bg-geantSap-gray-25">
        <tr className="text-nowrap   text-base  text-left font-bold text-geantSap-gray-600">
          <th className="p-6 rounded-tl-lg ">#</th>
          <th className="p-6">File path</th>
          <th className="p-6">File name</th>
          <th className="p-6 ">Attaching date</th>
          <th className="p-6 rounded-tr-lg"></th>
        </tr>
      </thead>
      <tbody className=" [&_tr:last-child]:border-0">
        {attachmentList?.map((attachment, index) => (
          <tr
            key={index}
            className="text-geantSap-black font-normal text-base border-b-2 border-geantSap-gray-25 transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{attachment.filePath}</td>
            <td className="px-6 py-3">{attachment.fileName} </td>

            <td className="px-6 py-3">
              {attachment.attachingDate.split(" ")[0]}
            </td>
            <td className="px-6 py-3">
              <Button
                disabled={isLoading}
                onClick={() =>
                  downloadAttachments(
                    `attachment?fileName=${attachment.fileName}&fileExtension=${attachment.fileExtension}&filePath=${attachment.filePath}`,
                    attachment.fileName,setIsLoading,toast
                  )
                }
                size={"icon"}
                className="bg-transparent hover:bg-geantSap-gray-50 ">
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-geantSap-primary-500"
                />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Attachments;
