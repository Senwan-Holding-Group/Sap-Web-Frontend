import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftFromBracket,
  faArrowLeftLongToLine,
  faArrowRightLongToLine,
  faBasketShopping,
  faBellRing,
  faCartFlatbedBoxes,
  faChartMixed,
  faDiamonds4,
  faGear,
  faSitemap,
  faUsers,
} from "@fortawesome/pro-solid-svg-icons";
import { Button } from "./button";
import { useAuth } from "@/api/Auth/useAuth";
import { useState } from "react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <FontAwesomeIcon icon={faDiamonds4} />,
        label: "Dashboard",
        path: "/sap/dashboard",
      },
      {
        icon: <FontAwesomeIcon icon={faBasketShopping} />,
        label: "Purchasing",
        path: "/sap/purchasing",
      },
      {
        icon: <FontAwesomeIcon icon={faUsers} />,
        label: "Vendors",
        path: "/sap/vendors",
      },
      {
        icon: <FontAwesomeIcon icon={faSitemap} />,
        label: "Items Master Data",
        path: "/sap/items",
      },
      {
        icon: <FontAwesomeIcon icon={faCartFlatbedBoxes} />,
        label: "Inventory",
        path: "/sap/inventory",
      },
      {
        icon: <FontAwesomeIcon icon={faChartMixed} />,
        label: "Reports",
        path: "/sap/reports",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <FontAwesomeIcon icon={faBellRing} />,
        label: "Alerts",
        path: "/sap/alerts",
      },
      {
        icon: <FontAwesomeIcon icon={faGear} />,
        label: "Settings",
        path: "/settings",
      },
    ],
  },
];

const Sidebar = ({
  expand,
  toggle,
}: {
  expand: boolean;
  toggle: (close?: boolean) => void;
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout();
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-y-10 bg-white z-50">
      <div className=" w-full  flex flex-col gap-y-4  p-4 ">
        <div className={`flex  ${expand ? "justify-end" : "justify-center"}`}>
          {expand ? (
            <FontAwesomeIcon
              onClick={() => toggle(true)}
              className="w-6 h-[1.2rem] cursor-pointer text-geantSap-primary-500  "
              icon={faArrowLeftLongToLine}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => toggle(false)}
              className="w-6 h-[1.2rem] cursor-pointer text-geantSap-primary-500 "
              icon={faArrowRightLongToLine}
            />
          )}
        </div>
        <div className="flex justify-center">
          {expand ? (
            <div className="max-w-[11.25rem] overflow-hidden">
              <img
                src={"/geantlogoaren.svg"}
                className="w-full h-[2.055rem]  object-contain px-2"
                alt="logoaren"
                title="Geant Sap"
              />
            </div>
          ) : (
            <img
              src={"/logo.svg"}
              className="w-[2.10625rem] h-[2.05rem] "
              alt="logo"
              title="Geant Sap"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col h-full  justify-between  ">
        {menuItems.map((i) => (
          <div
            className={`flex  flex-col ${
              expand ? " " : "items-center"
            } gap-y-6`}
            key={i.title}
          >
            <>
              {i.items.map((item) => (
                <NavLink
                  onClick={() => toggle(true)}
                  to={item.path}
                  key={item.label}
                  style={({ isActive }) => ({
                    color: isActive ? "#006c50" : "#727273",
                    background: isActive ? "#e6f1ee " : "",
                    margin: isActive ? "0 0.5rem" : "0 1rem",
                    borderRadius: isActive ? "0.5rem" : "",
                    padding: isActive ? "0.25rem 0.5rem" : "",
                    fontWeight: isActive ? "600" : "500",
                  })}
                  className={`flex items-center h-8  rounded-lg  ${
                    expand ? "justify-between " : "justify-center w-[2.375rem] "
                  } `}
                >
                  {expand && (
                    <span className=" text-base truncate max-w-[180px]">
                      {item.label}
                    </span>
                  )}
                  {item.icon}
                </NavLink>
              ))}
            </>
            {i.title === "OTHER" && (
              <div className="px-4 my-4">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  disabled={isLoggingOut}
                  className={`disabled:opacity-50 transition-all duration-300 ease-in-out flex items-center gap-2 ${
                    expand ? "w-56" : "w-10"
                  }`}
                >
                  <FontAwesomeIcon
                    className={`transition-transform duration-300 ease-in-out
                    }`}
                    icon={faArrowLeftFromBracket}
                  />
                  <span
                    className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                      expand
                        ? "opacity-100 max-w-[200px]"
                        : "opacity-0 max-w-0 overflow-hidden"
                    }`}
                  >
                    Logout
                  </span>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
