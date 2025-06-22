import { Outlet } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import useToggleState from "./lib/hooks/useToggleState";
import { useAuth } from "./api/Auth/useAuth";


const App = () => {
  const [expand, toggle] = useToggleState(false);
  const { token } = useAuth();

  return (
    <div className="h-dvh  w-screen bg-geantSap-bg flex font-sans">
        <div
          className={`fixed transition-all ease-out duration-300 rounded-tr-lg rounded-br-lg shadow h-full z-10 ${
            expand ? "w-64" : "w-[4.5rem]"
          }`}
        >
         {token!=null&& <Sidebar expand={expand} toggle={toggle} />}
        </div>
        <div className={`py-6 pl-24 pr-6 w-full  font-sans`}>
          <Outlet />
        </div>
    </div>
  );
};

export default App;
