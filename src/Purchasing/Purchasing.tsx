import Search from "@/components/ui/Search";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

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
        <div className="flex gapx border-b border-geantSap-gray-100  h-10">
          <NavLink
            to={"/purchasing/draft"}
            style={({ isActive }) => ({
              color: isActive ? "#141414" : "#727273",
              fontWeight: isActive ? "700" : "400",
              borderBottomWidth: isActive ? "3px" : "",
              borderColor: isActive ? "#006C50" : "",
            })}
            className={`flex items-center h-10   px-4 py-2`}
          >
            <h1>Drafts</h1>
          </NavLink>
          <NavLink
            to={"/purchasing/active-PO"}
            style={({ isActive }) => ({
              color: isActive ? "#141414" : "#727273",
              fontWeight: isActive ? "700" : "400",
              borderBottomWidth: isActive ? "3px" : "",
              borderColor: isActive ? "#006C50" : "",
            })}
            className={`flex items-center h-10   px-4 py-2`}
          >
            <h1>Active PO Orders</h1>
          </NavLink>
          <NavLink
            to={"/purchasing/missing-qty"}
            style={({ isActive }) => ({
              color: isActive ? "#141414" : "#727273",
              fontWeight: isActive ? "700" : "400",
              borderBottomWidth: isActive ? "3px" : "",
              borderColor: isActive ? "#006C50" : "",
            })}
            className={`flex items-center h-10 px-4 py-2`}
          >
            <h1>MissingQty</h1>
          </NavLink>
          <NavLink
            to={"/purchasing/matching"}
            style={({ isActive }) => ({
              color: isActive ? "#141414" : "#727273",
              fontWeight: isActive ? "700" : "400",
              borderBottomWidth: isActive ? "3px" : "",
              borderColor: isActive ? "#006C50" : "",
            })}
            className={`flex items-center h-10 px-4 py-2`}
          >
            <h1>Matching</h1>
          </NavLink>
        </div>
      </div>
        {!location.pathname.includes("details") && <Search />}
      <Outlet />
    </div>
  );
};

export default Purchasing;
