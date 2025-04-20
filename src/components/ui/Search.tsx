import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "./input";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/pro-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MenuList } from "@/lib/types";
type searchProps = {
  menuList: MenuList[];
  search: { searchKey: string; searchValue: string };
  setSearch: React.Dispatch<
    React.SetStateAction<{
      searchKey: string;
      searchValue: string;
    }>
  >;
};
const Search = ({ menuList, setSearch, search }: searchProps) => {
  return (
    <div className=" max-w-md h-10 flex items-center px-2 gap-x-1 border border-geantSap-gray-50 rounded-lg">
      <span className="size-9 flex items-center justify-center">
        <FontAwesomeIcon
          className="h-5 w-5 text-geantSap-primary-600"
          icon={faMagnifyingGlass}
        />
      </span>
      <Input
        defaultValue={search.searchValue}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            setSearch({ ...search, searchValue: e.currentTarget.value });
        }}
        placeholder="Search"
        className="border-0 flex-1 leading-[22.4px]  bg-transparent"
      />
      <span className="text-geantSap-primary-600  font-medium text-base leading-[18.75px]">
        By {menuList.find((item) => item.value === search.searchKey)?.label}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none ">
          <span className="size-6  flex items-center justify-center">
            <FontAwesomeIcon
              className="h-[1rem] w-[0.875rem] text-geantSap-primary-600 cursor-pointer"
              icon={faAngleDown}
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mt-3 rounded-xl border border-geantSap-gray-25">
          {menuList.map((item) => (
            <DropdownMenuItem
              onClick={() => {
                setSearch({ ...search, searchKey: item.value });
              }}
              key={item.value}
              className="border-b last:border-b-0 font-normal hover:bg-geantSap-gray-25 text-base leading-[22.4px] text-geantSap-black border-geantSap-gray-100 cursor-pointer"
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Search;
