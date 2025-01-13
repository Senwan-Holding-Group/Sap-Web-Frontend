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
import ProtectedRoute from "./ProtectedRoute";
import SplashScreen from "@/components/SplashScreen";
import Inventory from "@/Inventory/Inventory";
import Transfer from "@/Inventory/Transfer/Transfer";
import TransferTable from "@/Inventory/Transfer/TransferTable";
import TransferDetails from "@/Inventory/Transfer/TransferDetails";
import InventoryMissingQty from "@/Inventory/MissingQty/InventoryMissingQty";
import InventorMissingQtyTable from "@/Inventory/MissingQty/InventorMissingQtyTable";
import InventoryMissingQtyDetails from "@/Inventory/MissingQty/InventoryMissingQtyDetails";
import Alerts from "@/Alerts/Alerts";
import AlertsTable from "@/Alerts/AlertsTable";
import Reports from "@/Reports/Reports";
import ReportsTable from "@/Reports/ReportsTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
    errorElement: <NotFound />,
  },
  {
    path: "/sap",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/sap/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sap/purchasing",
        element: (
          <ProtectedRoute>
            <Purchasing />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/sap/purchasing/draft",
            element: <Draft />,
            children: [
              {
                path: "/sap/purchasing/draft",
                element: <DraftTable />,
              },
              {
                path: "details/:id",
                element: <DraftDetails />,
              },
            ],
          },
          {
            path: "/sap/purchasing/active-PO",
            element: <ActivePO />,
            children: [
              {
                path: "/sap/purchasing/active-PO",
                element: <POTable />,
              },
              {
                path: "details/:id",
                element: <PODetails />,
              },
            ],
          },
          {
            path: "/sap/purchasing/missing-qty",
            element: <MissingQty />,
            children: [
              {
                path: "/sap/purchasing/missing-qty",
                element: <MissingQtyTable />,
              },
              {
                path: "details/:id",
                element: <MissingQtyDetails />,
              },
            ],
          },
          {
            path: "/sap/purchasing/matching",
            element: <Matching />,
            children: [
              {
                path: "/sap/purchasing/matching",
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
        path: "/sap/inventory",
        element: (
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/sap/inventory/transfer",
            element: <Transfer />,
            children: [
              {
                path: "/sap/inventory/transfer",
                element: <TransferTable />,
              },
              {
                path: "details/:id",
                element: <TransferDetails />,
              },
            ],
          },
          {
            path: "/sap/inventory/missing-qty",
            element: <InventoryMissingQty />,
            children: [
              {
                path: "/sap/inventory/missing-qty",
                element: <InventorMissingQtyTable />,
              },
              {
                path: "details/:id",
                element: <InventoryMissingQtyDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "/sap/items",
        element: (
          <ProtectedRoute>
            <Items />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/sap/items",
            element: <ItemsTable />,
          },
          {
            path: "details/:id",
            element: <ItemDetails />,
          },
        ],
      },
      {
        path: "/sap/vendors",
        element: (
          <ProtectedRoute>
            <Vendors />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/sap/vendors",
            element: <VendorsTable />,
          },
          {
            path: "details/:id",
            element: <VendorsDetails />,
          },
        ],
      },
      {
        path: "/sap/alerts",
        element: (
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/sap/alerts",
            element: <AlertsTable />,
          },
        ],
      },
      {
        path: "/sap/reports",
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/sap/reports",
            element: <ReportsTable />,
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
