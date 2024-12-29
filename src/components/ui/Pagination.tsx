import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./button";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { useEffect, useState } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const [pages, setPages] = useState<(number | string)[]>([]);
  const [expandedLeft, setExpandedLeft] = useState(false);
  const [expandedRight, setExpandedRight] = useState(false);

  useEffect(() => {
    calculatePages();
  }, [currentPage, totalPages, expandedLeft, expandedRight]);

  const calculatePages = () => {
    const pageNumbers: (number | string)[] = [];
    const VISIBLE_PAGES = 7; 
    const EXPANDED_PAGES = 5;

    if (totalPages <= VISIBLE_PAGES) {
      // If total pages is 7 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      if (currentPage <= 4) {
        // If current page is near the start
        if (expandedRight) {
          // Show more numbers after current page without duplicates
          for (let i = 2; i <= Math.min(8, totalPages - 1); i++) {
            pageNumbers.push(i);
          }
        } else {
          // Show limited numbers
          for (let i = 2; i <= 4; i++) {
            pageNumbers.push(i);
          }
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // If current page is near the end
        if (expandedLeft) {
          for (let i = Math.max(2, totalPages - 6); i < totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          pageNumbers.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        }
      } else {
        // If current page is in the middle
        if (expandedLeft) {
            // Show limited numbers before current page
            const startPage = Math.max(2, currentPage - EXPANDED_PAGES);
            if (startPage > 2) pageNumbers.push("...");
            for (let i = startPage; i < currentPage; i++) {
              pageNumbers.push(i);
            }
        } else {
          pageNumbers.push("...");
        }

        // Always show current page and adjacent numbers
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);

        if (expandedRight) {
         // Show limited numbers after current page
         const endPage = Math.min(currentPage + EXPANDED_PAGES, totalPages - 1);
         for (let i = currentPage + 2; i <= endPage; i++) {
           pageNumbers.push(i);
         }
         if (endPage < totalPages - 1) pageNumbers.push("...");
        } else {
          pageNumbers.push("...");
        }
        
        if (pageNumbers[pageNumbers.length - 1] !== totalPages) {
          pageNumbers.push(totalPages);
        }
      }
    }

    // Remove any duplicates
    const uniquePages = pageNumbers.filter((value, index, self) => 
      self.indexOf(value) === index
    );

    setPages(uniquePages);
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setExpandedLeft(false);
      setExpandedRight(false);
    }
  };

  const handleEllipsisClick = (position: "left" | "right") => {
    if (position === "left") {
      setExpandedLeft(true);
      setExpandedRight(false);
    } else {
      setExpandedRight(true);
      setExpandedLeft(false);
    }
  };

  const handleFirstPage = () => handlePageClick(1);
  const handleLastPage = () => handlePageClick(totalPages);
  const handlePrevPage = () => handlePageClick(currentPage - 1);
  const handleNextPage = () => handlePageClick(currentPage + 1);

  return (
    <div className="w-full h-full px-4 py-2 bg-geantSap-gray-25 rounded-bl-xl rounded-br-xl">
      <div className="mx-auto flex w-full justify-center">
        <ul className="flex flex-row items-center gap-x-6 text-[0.75rem] leading-[1.5rem] font-normal">
          <div className="flex">
            <li className="flex justify-center">
              <Button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className="size-6 p-0 bg-transparent"
              >
                <FontAwesomeIcon
                  className={`${
                    currentPage === 1
                      ? "text-geantSap-gray-200"
                      : "text-geantSap-gray-400"
                  }`}
                  icon={faAnglesLeft}
                />
              </Button>
            </li>
            <li className="flex justify-center">
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="size-6 p-0 bg-transparent"
              >
                <FontAwesomeIcon
                  className={`${
                    currentPage === 1
                      ? "text-geantSap-gray-200"
                      : "text-geantSap-gray-400"
                  }`}
                  icon={faChevronLeft}
                />
              </Button>
            </li>
          </div>
          <div className="flex flex-row text-geantSap-gray-500 gap-2  ">
            {pages.map((page, index) => (
              <li
                key={index}
                className={`size-6 flex justify-center items-center  cursor-pointer hover:bg-geantSap-gray-50 rounded-lg px-4
                  ${
                    page === currentPage
                      ? "bg-geantSap-gray-50  rounded-lg px-4 font-bold text-[12px] leading-[21px] text-geantSap-black"
                      : ""
                  }
                `}
                onClick={() =>
                  typeof page === "number"
                    ? handlePageClick(page)
                    : handleEllipsisClick(
                        index < pages.length / 2 ? "left" : "right"
                      )
                }
              >
                {page}
              </li>
            ))}
          </div>
          <div className="flex">
            <li className="flex justify-center">
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="size-6 p-0 bg-transparent"
              >
                <FontAwesomeIcon
                  className={`${
                    currentPage === totalPages
                      ? "text-geantSap-gray-200"
                      : "text-geantSap-gray-400"
                  }`}
                  icon={faChevronRight}
                />
              </Button>
            </li>
            <li className="flex justify-center">
              <Button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className="size-6 p-0 bg-transparent"
              >
                <FontAwesomeIcon
                  className={`${
                    currentPage === totalPages
                      ? "text-geantSap-gray-200"
                      : "text-geantSap-gray-400"
                  }`}
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
