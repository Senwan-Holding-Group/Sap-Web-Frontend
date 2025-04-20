import { toBePaidMenu } from "@/lib/constants";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const TobePaid = () => {
  const [search, setSearch] = useState({
      searchKey: toBePaidMenu[0].value,
      searchValue: "",
    });  
    const [paymentDate, setpaymentDate] = useState<string>("");

  return (
    <div>
      <Outlet context={{search,setSearch,paymentDate, setpaymentDate}}/>
    </div>
  );
};

export default TobePaid;
