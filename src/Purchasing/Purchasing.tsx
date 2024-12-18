import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
const taps = [
  {
    label: "Drafts",
    path: "/purchasing/draft",
  },
  {
    label: "Active PO Orders",
    path: "/purchasing/active-PO",
  },
  {
    label: "MissingQty",
    path: "/purchasing/missing-qty",
  },
  {
    label: "Matching",
    path: "/purchasing/matching",
  },
];
const Purchasing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname === "/purchasing";

  useEffect(() => {
    navigate("/purchasing/draft");
  }, [pathname, navigate]);

  return (
    <div className="overflow-hidden w-full flex  flex-col gap-y-4 ">
      <div className="  flex flex-col gap-y-2">
        <h1 className="text-geantSap-primary-500 font-bold text-2xl leading-[36px] ">
          Purchasing
        </h1>
        <div className="flex gapx border-b border-geantSap-gray-100 overflow-x-scroll text-nowrap  h-10">
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
    </div>
  );
};

export default Purchasing;
