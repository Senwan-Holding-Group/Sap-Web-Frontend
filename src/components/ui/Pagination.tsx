import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./button";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";

const Pagination = () => {
  return (
    <div className="w-full  px-4 py-2 bg-geantSap-gray-25 rounded-bl-xl rounded-br-xl ">
      <div className="mx-auto flex w-full justify-center">
        <ul className="flex flex-row items-center gap-x-6 text-[0.75rem] leading-[1.5rem] lfont-normal">
          <div className="flex">
            <li className="  flex justify-center">
              <Button className="size-6 p-0 bg-transparent">
                <FontAwesomeIcon
                  className="text-geantSap-gray-400"
                  icon={faAnglesLeft}
                />
              </Button>
            </li>
            <li className="  flex justify-center">
              <Button className="size-6 p-0 bg-transparent">
                <FontAwesomeIcon
                  className="text-geantSap-gray-400"
                  icon={faChevronLeft}
                />
              </Button>
            </li>
          </div>
          <div className="flex flex-row text-geantSap-gray-500">
            <li className="size-6 flex justify-center items-center">1</li>
            <li className="size-6 flex justify-center  items-center">2</li>
            <li className="size-6 flex justify-center  items-center">3</li>
            <li className="size-6 flex justify-center  items-center">...</li>

            <li className="size-6 flex justify-center  items-center">99</li>
            <li className="size-6 flex justify-center  items-center">100</li>
          </div>
          <div className="flex">
            <li className=" flex justify-center">
              <Button className="size-6 p-0 bg-transparent">
                <FontAwesomeIcon
                  className="text-geantSap-gray-400"
                  icon={faChevronRight}
                />
              </Button>
            </li>
            <li className=" flex justify-center">
              <Button className="size-6 p-0 bg-transparent">
                <FontAwesomeIcon
                  className="text-geantSap-gray-400"
                  icon={faAnglesRight}
                />
              </Button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
