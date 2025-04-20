import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LoginPage from "@/Login/LoginPage";
import Dashboard from "@/Dashboard/Dashboard";
import NotFound from "@/components/Notfound";
import ProtectedRoute from "./ProtectedRoute";
import SplashScreen from "@/components/SplashScreen";
import Alerts from "@/Alerts/Alerts";
import AlertsTable from "@/Alerts/AlertsTable";
import Reports from "@/Reports/Reports";
import ReportsTable from "@/Reports/ReportsTable";
import Purchasing from "@/Commercial/Purchasing/Purchasing";
import Draft from "@/Commercial/Purchasing/Drafts/Draft";
import DraftTable from "@/Commercial/Purchasing/Drafts/DraftTable";
import DraftDetails from "@/Commercial/Purchasing/Drafts/DraftDetails";
import ActivePO from "@/Commercial/Purchasing/ActivePO/ActivePO";
import POTable from "@/Commercial/Purchasing/ActivePO/POTable";
import PODetails from "@/Commercial/Purchasing/ActivePO/PODetails";
import MissingQty from "@/Commercial/Purchasing/MissingQuantity/MissingQty";
import MissingQtyTable from "@/Commercial/Purchasing/MissingQuantity/MissingQtyTable";
import MissingQtyDetails from "@/Commercial/Purchasing/MissingQuantity/MissingQtyDetails";
import Matching from "@/Commercial/Purchasing/Matching/Matching";
import MatchingTable from "@/Commercial/Purchasing/Matching/MatchingTable";
import MatchingDetails from "@/Commercial/Purchasing/Matching/MatchingDetails";
import Inventory from "@/Commercial/Inventory/Inventory";
import Items from "@/Commercial/Items/Items";
import ItemsTable from "@/Commercial/Items/ItemsTable";
import ItemDetails from "@/Commercial/Items/ItemDetails";
import Transfer from "@/Commercial/Inventory/Transfer/Transfer";
import TransferTable from "@/Commercial/Inventory/Transfer/TransferTable";
import TransferDetails from "@/Commercial/Inventory/Transfer/TransferDetails";
import InventoryMissingQty from "@/Commercial/Inventory/MissingQty/InventoryMissingQty";
import InventorMissingQtyTable from "@/Commercial/Inventory/MissingQty/InventorMissingQtyTable";
import InventoryMissingQtyDetails from "@/Commercial/Inventory/MissingQty/InventoryMissingQtyDetails";
import Invoices from "@/Finance/Invoices/Invoices";
import Payments from "@/Finance/Payments/Payments";
import GRPO from "@/Finance/Invoices/ActiveGRPO/GRPO";
import GRPOTable from "@/Finance/Invoices/ActiveGRPO/GRPOTable";
import GRPODetails from "@/Finance/Invoices/ActiveGRPO/GRPODetails";
import AP from "@/Finance/Invoices/AP/AP";
import APTable from "@/Finance/Invoices/AP/APTable";
import APDetails from "@/Finance/Invoices/AP/APDetails";
import FNMatching from "@/Finance/Invoices/Matching/FNMatching";
import FNMatchingTable from "@/Finance/Invoices/Matching/FNMatchingTable";
import FNMatchingDetails from "@/Finance/Invoices/Matching/FNMatchingDetails";
import GoodsReturn from "@/Finance/Invoices/GoodsReturn/GoodsReturn";
import GoodsReturnTable from "@/Finance/Invoices/GoodsReturn/GoodsReturnTable";
import GoodsReturnDetails from "@/Finance/Invoices/GoodsReturn/GoodsReturnDetails";
import GoodsReturnMH from "@/Finance/Invoices/MatchingGoodsReturn/GoodsReturnMH";
import GoodsReturnMHDetails from "@/Finance/Invoices/MatchingGoodsReturn/GoodsReturnMHDetails";
import CreditMemo from "@/Finance/Invoices/CreditMemo/CreditMemo";
import GoodsReturnMHTable from "@/Finance/Invoices/MatchingGoodsReturn/GoodsReturnMHTable";
import CreditMemoTable from "@/Finance/Invoices/CreditMemo/CreditMemoTable";
import CreditMemoDetails from "@/Finance/Invoices/CreditMemo/CreditMemoDetails";
import CMGoodsReturnMH from "@/Commercial/Purchasing/MatchingGoodsReturn/CMGoodsReturnMH";
import CMGoodsReturnMHTable from "@/Commercial/Purchasing/MatchingGoodsReturn/CMGoodsReturnMHTable";
import CMGoodsReturnMHDetails from "@/Commercial/Purchasing/MatchingGoodsReturn/CMGoodsReturnMHDetails";
import VendorsList from "@/Vendors/VendorsList/VendorsList";
import VendorsListTable from "@/Vendors/VendorsList/VendorsListTable";
import VendorsListDetails from "@/Vendors/VendorsList/VendorsListDetails";
import CreditNote from "@/Vendors/CreditNote/CreditNote";
import Vendors from "@/Vendors/Vendors";
import CreditNoteTable from "@/Vendors/CreditNote/CreditNoteTable";
import CreditNoteDetails from "@/Vendors/CreditNote/CreditNoteDetails";
import TobePaid from "@/Finance/Payments/Outgoing/ToBePaid/ToBePaid";
import ToBePaidTable from "@/Finance/Payments/Outgoing/ToBePaid/ToBePaidTable";
import ToBePaidDetails from "@/Finance/Payments/Outgoing/ToBePaid/ToBePaidDetails";
import CompletedPts from "@/Finance/Payments/Outgoing/Completed/CompletedPts";
import CompletedPtsTable from "@/Finance/Payments/Outgoing/Completed/CompletedPtsTable";
import CompletedPtsDetails from "@/Finance/Payments/Outgoing/Completed/CompletedPtsDetails";

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
          {
            path: "/sap/purchasing/goods-return-matching",
            element: <CMGoodsReturnMH />,
            children: [
              {
                path: "/sap/purchasing/goods-return-matching",
                element: <CMGoodsReturnMHTable />,
              },
              {
                path: "details/:id",
                element: <CMGoodsReturnMHDetails />,
              },
            ],
          },
        ],
      },

      {
        path: "/sap/invoices",
        element: (
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/sap/invoices/GRPO",
            element: <GRPO />,
            children: [
              {
                path: "/sap/invoices/GRPO",
                element: <GRPOTable />,
              },
              {
                path: "details/:id",
                element: <GRPODetails />,
              },
            ],
          },
          {
            path: "/sap/invoices/AP-invoice",
            element: <AP />,
            children: [
              {
                path: "/sap/invoices/AP-invoice",
                element: <APTable />,
              },
              {
                path: "details/:id",
                element: <APDetails />,
              },
            ],
          },
          {
            path: "/sap/invoices/matching",
            element: <FNMatching />,
            children: [
              {
                path: "/sap/invoices/matching",
                element: <FNMatchingTable />,
              },
              {
                path: "details/:id",
                element: <FNMatchingDetails />,
              },
            ],
          },
          {
            path: "/sap/invoices/goods-return",
            element: <GoodsReturn />,
            children: [
              {
                path: "/sap/invoices/goods-return",
                element: <GoodsReturnTable />,
              },
              {
                path: "details/:id",
                element: <GoodsReturnDetails />,
              },
            ],
          },
          {
            path: "/sap/invoices/goods-return-matching",
            element: <GoodsReturnMH />,
            children: [
              {
                path: "/sap/invoices/goods-return-matching",
                element: <GoodsReturnMHTable />,
              },
              {
                path: "details/:id",
                element: <GoodsReturnMHDetails />,
              },
            ],
          },
          {
            path: "/sap/invoices/credit-memo",
            element: <CreditMemo />,
            children: [
              {
                path: "/sap/invoices/credit-memo",
                element: <CreditMemoTable />,
              },
              {
                path: "details/:id",
                element: <CreditMemoDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "/sap/payments",
        element: (
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/sap/payments/tobe-paid",
            element: <TobePaid />,
            children: [
              {
                path: "/sap/payments/tobe-paid",
                element: <ToBePaidTable/>,
              },
              {
                path: "details/:id/:paymentDate",
                element:  <ToBePaidDetails/>,
              },
            ],
          },
          {
            path: "/sap/payments/completed-payments",
            element:  <CompletedPts/>,
            children: [
              {
                path: "/sap/payments/completed-payments",
                element:  <CompletedPtsTable/>,
              },
              {
                path: "details/:id/:paymentDate",
                element:  <CompletedPtsDetails/>,
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
            path: "/sap/vendors/vendorsList",
            element: <VendorsList />,
            children: [
              {
                path: "/sap/vendors/vendorsList",
                element: <VendorsListTable />,
              },
              {
                path: "details/:id",
                element: <VendorsListDetails />,
              },
            ],
          },
          {
            path: "/sap/vendors/creditNoteList",
            element: <CreditNote />,
            children: [
              {
                path: "/sap/vendors/creditNoteList",
                element: <CreditNoteTable />,
              },
              {
                path: "details/:id",
                element: <CreditNoteDetails />,
              },
            ],
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
