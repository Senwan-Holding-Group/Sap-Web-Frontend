import { activeGRPOmenu } from "@/lib/constants";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const GRPO = () => {
 const [search, setSearch] = useState({
       searchKey: activeGRPOmenu[0].value,
       searchValue: "",
     });  
     const [query, setquery] = useState<string>("");
     const [currentPage, setCurrentPage] = useState(1);

   return (
     <div>
       <Outlet context={{search,setSearch,query, setquery,currentPage, setCurrentPage}}/>
     </div>
   );
};

export default GRPO;
