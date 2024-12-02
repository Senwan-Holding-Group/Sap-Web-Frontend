import { Outlet } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import useToggleState from "./lib/hooks/useToggleState";

const App = () => {
  const [open, toggle] = useToggleState(false);
  return (
    <div className="h-screen w-screen bg-geantSap-bg flex">
      <div
        className={`fixed transition-all ease-out duration-300 rounded-tr-lg rounded-br-lg shadow h-full z-10 ${
          open ? "w-64" : "w-[4.5rem]"
        }`}
      >
        <Sidebar expand={open} toggle={toggle} />
      </div>
      <div className={`py-6 pl-24 pr-6 w-screen `}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
