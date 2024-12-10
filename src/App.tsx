import { Outlet } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import useToggleState from "./lib/hooks/useToggleState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const [expand, toggle] = useToggleState(false);
  return (
    <div className="h-screen w-screen bg-geantSap-bg flex">
      <QueryClientProvider client={queryClient}>
        <div
          className={`fixed transition-all ease-out duration-300 rounded-tr-lg rounded-br-lg shadow h-full z-10 ${
            expand ? "w-64" : "w-[4.5rem]"
          }`}
        >
          <Sidebar expand={expand} toggle={toggle} />
        </div>
        <div className={`py-6 pl-24 pr-6 w-screen `}>
          <Outlet />
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default App;
