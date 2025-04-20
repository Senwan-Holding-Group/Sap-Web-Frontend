import { activeGRPOmenu } from "@/lib/constants";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const GRPO = () => {
 const [search, setSearch] = useState({
       searchKey: activeGRPOmenu[0].value,
       searchValue: "",
     });  
     const [query, setquery] = useState<string>("");
 
   return (
     <div>
       <Outlet context={{search,setSearch,query, setquery}}/>
     </div>
   );
};

export default GRPO;
