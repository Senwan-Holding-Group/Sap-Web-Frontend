import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

import LoginPage from "@/Login/LoginPage";
import Dashboard from "@/Dashboard/Dashboard";
import NotFound from "@/components/Notfound";
import Purchasing from "@/Purchasing/Purchasing";
import ActivePO from "@/Purchasing/ActivePO/ActivePO";
import POTable from "@/Purchasing/ActivePO/POTable";
import PODetails from "@/Purchasing/ActivePO/PODetails";
import MissingQty from "@/Purchasing/MissingQuantity/MissingQty";
import MissingQtyTable from "@/Purchasing/MissingQuantity/MissingQtyTable";
import MissingQtyDetails from "@/Purchasing/MissingQuantity/MissingQtyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/purchasing",
        element: <Purchasing />,
        children: [
          {
            
            path: "/purchasing/active-PO",
            element: <ActivePO />,
            children: [
              {
                path: "/purchasing/active-PO",
                element: <POTable />,
              },
              {
                path: "details/:id",
                element: <PODetails />,
              },
            ],
          },
          {
            path: "/purchasing/missing-qty",
            element: <MissingQty />,
            children: [
              {
                path: "/purchasing/missing-qty",
                element: <MissingQtyTable />,
              },
              {
                path: "details/:id",
                element: <MissingQtyDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    errorElement: <NotFound />,
    element: <LoginPage />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
