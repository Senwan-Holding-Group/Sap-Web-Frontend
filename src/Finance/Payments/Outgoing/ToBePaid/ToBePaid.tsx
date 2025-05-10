import { toBePaidMenu } from "@/lib/constants";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const TobePaid = () => {
  const [search, setSearch] = useState({
      searchKey: toBePaidMenu[0].value,
      searchValue: "",
    });  
    const [paymentDate, setpaymentDate] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <Outlet context={{search,setSearch,paymentDate, setpaymentDate,currentPage, setCurrentPage}}/>
    </div>
  );
};

export default TobePaid;
