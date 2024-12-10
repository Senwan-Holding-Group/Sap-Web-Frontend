import logoaren from "/geantlogoaren.svg";
import logo from "/logo.svg";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftFromBracket,
  faArrowLeftLongToLine,
  faArrowRightLongToLine,
  faBasketShopping,
  faBellRing,
  faDiamonds4,
  faGear,
  faSitemap,
  faUsers,
} from "@fortawesome/pro-solid-svg-icons";
import { Button } from "./button";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <FontAwesomeIcon icon={faDiamonds4} />,
        label: "Dashboard",
        path: "/",
      },
      {
        icon: <FontAwesomeIcon icon={faBasketShopping} />,
        label: "Purchasing",
        path: "/purchasing",
      },
      {
        icon: <FontAwesomeIcon icon={faUsers} />,
        label: "Vendors",
        path: "/vendors",
      },
      {
        icon: <FontAwesomeIcon icon={faSitemap} />,
        label: "Items Master Data",
        path: "/items",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <FontAwesomeIcon icon={faBellRing} />,
        label: "Alerts",
        path: "/alerts",
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
  toggle: () => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-y-10 bg-white z-50">
      <div className=" w-full  flex flex-col gap-y-4  p-4 ">
        <div className={`flex  ${expand ? "justify-end" : "justify-center"}`}>
          {expand ? (
            <FontAwesomeIcon
              onClick={() => toggle()}
              className="w-6 h-[1.2rem] cursor-pointer text-geantSap-primary-500  "
              icon={faArrowLeftLongToLine}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => toggle()}
              className="w-6 h-[1.2rem] cursor-pointer text-geantSap-primary-500 "
              icon={faArrowRightLongToLine}
            />
          )}
        </div>
        <div className="flex justify-center">
          {expand ? (
            <img
              src={logoaren}
              className="w-[11.25rem] h-[2.055rem]  object-cover"
              alt="logoaren"
              title="Geant Sap"
            />
          ) : (
            <img
              src={logo}
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
            {i.items.map((item) => (
              <NavLink
                to={item.path}
                key={item.label}
                style={({ isActive }) => ({
                  color: isActive ? "#006c50" : "#727273",
                  background: isActive ? "#e6f1ee " : "",
                  margin: isActive ? "0 0.5rem" : "0 1rem",
                  borderRadius: isActive ? "0.5rem" : "",
                  padding: isActive ? "0.25rem 0.5rem" : "",
                  
                })}
                className={`flex items-center h-8  rounded-lg  ${
                  expand ? "justify-between " : "justify-center w-[2.375rem] "
                } `}
              >
                {expand && (
                  <span className="font-medium text-base ">{item.label}</span>
                )}
                {item.icon}
              </NavLink>
            ))}
            {i.title === "OTHER" && (
              <div className="px-4 my-4">
                <Button
                  variant="destructive"
                  className={`${expand ? "w-56" : "w-10"}`}
                >
                  <FontAwesomeIcon icon={faArrowLeftFromBracket} />
                  {expand && "Logout"}
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
