import { NavLink, Outlet } from "react-router-dom"
const taps = [
    {
      label: "To be Paid",
      path: "/sap/payments/tobe-paid",
    },
    {
      label: "Completed Payments",
      path: "/sap/payments/completed-payments",
    },

  ];
const Payments = () => {
  return (
   <div className="overflow-hidden w-full flex  flex-col gap-y-4 ">
      <div className="  flex flex-col gap-y-2">
        <h1 className="text-geantSap-primary-500 font-bold text-2xl leading-[2.25rem] ">
          Payments
        </h1>
        <div className="flex  border-b border-geantSap-gray-100 overflow-x-scrol text-nowrap  h-10">
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

export default Payments