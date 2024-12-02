import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Purchasing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/purchasing/active-PO")
  }, [navigate])
  

  return (
    <div className="overflow-hidden w-full flex flex-col gap-y-4 ">
      <div className="h-[140px]">
        <h1 className="text-geantSap-primary-500 font-bold text-2xl ">
          Purchasing
        </h1>
        <div className="flex">

        <NavLink
          to={"/purchasing/active-PO"}
          
          style={({ isActive }) => ({
            color: isActive ? "#006c50" : "#727273",
            background: isActive ? "#e6f1ee " : "",
            margin: isActive ? "0 0.5rem" : "0 1rem",
            borderRadius: isActive ? "0.5rem" : "",
            padding: isActive ? "0.25rem 0.5rem" : "",
          })}
          className={`flex items-center h-8  rounded-lg   `}
        >
          <h1>ActivePO</h1>
        </NavLink>
        <NavLink
          to={"/purchasing/missing-qty"}
          style={({ isActive }) => ({
            color: isActive ? "#006c50" : "#727273",
            background: isActive ? "#e6f1ee " : "",
            margin: isActive ? "0 0.5rem" : "0 1rem",
            borderRadius: isActive ? "0.5rem" : "",
            padding: isActive ? "0.25rem 0.5rem" : "",
          })}
          className={`flex items-center h-8  rounded-lg   `}
        >
          <h1>MissingQty</h1>
        </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Purchasing;
