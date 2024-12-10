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
import Matching from "@/Purchasing/Matching/Matching";
import MatchingDetails from "@/Purchasing/Matching/MatchingDetails";
import MatchingTable from "@/Purchasing/Matching/MatchingTable";
import Draft from "@/Purchasing/Drafts/Draft";
import DraftTable from "@/Purchasing/Drafts/DraftTable";
import DraftDetails from "@/Purchasing/Drafts/DraftDetails";
import Vendors from "@/Vendors/Vendors";
import VendorsTable from "@/Vendors/VendorsTable";
import VendorsDetails from "@/Vendors/VendorsDetails";
import Items from "@/Items/Items";
import ItemsTable from "@/Items/ItemsTable";
import ItemDetails from "@/Items/ItemDetails";

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
            path: "/purchasing/draft",
            element: <Draft />,
            children: [
              {
                path: "/purchasing/draft",
                element: <DraftTable />,
              },
              {
                path: "details/:id",
                element: <DraftDetails />,
              },
            ],
          },
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
          {
            path: "/purchasing/matching",
            element: <Matching />,
            children: [
              {
                path: "/purchasing/matching",
                element: <MatchingTable />,
              },
              {
                path: "details/:id",
                element: <MatchingDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "/items",
        element: <Items />,
        children: [
          {
            path: "/items",
            element: <ItemsTable />,
          },
          {
            path: "details/:id",
            element: <ItemDetails />,
          },
        ],
      },
      {
        path: "/vendors",
        element: <Vendors />,
        children: [
          {
            path: "/vendors",
            element: <VendorsTable />,
          },
          {
            path: "details/:id",
            element: <VendorsDetails />,
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
