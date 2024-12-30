import { Outlet } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import useToggleState from "./lib/hooks/useToggleState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./api/Auth/useAuth";

const queryClient = new QueryClient();

const App = () => {
  const [expand, toggle] = useToggleState(false);
  const { token } = useAuth();

  return (
    <div className="h-screen  w-screen bg-geantSap-bg flex font-sans">
      <QueryClientProvider client={queryClient}>
        <div
          className={`fixed transition-all ease-out duration-300 rounded-tr-lg rounded-br-lg shadow h-full z-10 ${
            expand ? "w-64" : "w-[4.5rem]"
          }`}
        >
         {token!=null&& <Sidebar expand={expand} toggle={toggle} />}
        </div>
        <div className={`py-6 pl-24 pr-6 w-full h-full font-sans`}>
          <Outlet />
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default App;
