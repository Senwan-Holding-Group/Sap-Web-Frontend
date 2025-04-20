import { NavLink, Outlet } from "react-router-dom"
const taps = [
    {
      label: "Active GRPO",
      path: "/sap/invoices/GRPO",
    },
    {
      label: "A/P invoice",
      path: "/sap/invoices/AP-invoice",
    },
    {
      label: "GRPO Matching",
      path: "/sap/invoices/matching",
    },
    {
      label: "Goods Return",
      path: "/sap/invoices/goods-return",
    },
    {
      label: "Goods Return Matching",
      path: "/sap/invoices/goods-return-matching",
    },
    {
      label: "Credit Memo",
      path: "/sap/invoices/credit-memo",
    },
  ];
const Invoices = () => {
  return (
    <div className="overflow-hidden w-full flex  flex-col gap-y-4 ">
      <div className="  flex flex-col gap-y-2">
        <h1 className="text-geantSap-primary-500 font-bold text-2xl leading-[36px] ">
          Invoices
        </h1>
        <div className="flex  border-b border-geantSap-gray-100 overflow-y-hidden overflow-x-scroll text-nowrap  h-[2.5rem]">
         {taps.map((tap)=>(
          <NavLink
            key={tap.label}
            to={tap.path}
            style={({ isActive }) => ({
              color: isActive ? "#141414" : "#727273",
              fontWeight: isActive ? "700" : "400",
              borderBottomWidth: isActive ? "3px" : "",
              borderColor: isActive ? "#006C50" : "",
            })}
            className={`flex items-center h-10   px-4 py-2`}
          >
            <h1>{tap.label}</h1>
          </NavLink>
         ))} 
        
        </div>
      </div>
      <Outlet />
    </div>  )
}

export default Invoices