import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
    path: "/promotion",
    element: <SplashScreen />,
    errorElement: <NotFound />,
  },
  {
    path: "/sap",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
            index: true,
            element: <Navigate to="/sap/dashboard" replace />,
          },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "purchasing",
        element: (
          <ProtectedRoute>
            <Purchasing />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/sap/purchasing/draft" replace />,
          },
          {
            path: "draft",
            element: <Draft />,
            children: [
              {
                index: true,
                element: <DraftTable />,
              },
              {
                path: "details/:id",
                element: <DraftDetails />,
              },
            ],
          },
          {
            path: "active-PO",
            element: <ActivePO />,
            children: [
              {
                index: true,
                element: <POTable />,
              },
              {
                path: "details/:id",
                element: <PODetails />,
              },
            ],
          },
          {
            path: "missing-qty",
            element: <MissingQty />,
            children: [
              {
                index: true,
                element: <MissingQtyTable />,
              },
              {
                path: "details/:id",
                element: <MissingQtyDetails />,
              },
            ],
          },
          {
            path: "matching",
            element: <Matching />,
            children: [
              {
                index: true,
                element: <MatchingTable />,
              },
              {
                path: "details/:id",
                element: <MatchingDetails />,
              },
            ],
          },
          {
            path: "goods-return-matching",
            element: <CMGoodsReturnMH />,
            children: [
              {
                index: true,
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
        path: "invoices",
        element: (
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/sap/invoices/GRPO" replace />
          },
          {
            path: "GRPO",
            element: <GRPO />,
            children: [
              {
                index: true,
                element: <GRPOTable />,
              },
              {
                path: "details/:id",
                element: <GRPODetails />,
              },
            ],
          },
          {
            path: "AP-invoice",
            element: <AP />,
            children: [
              {
                index: true,
                element: <APTable />,
              },
              {
                path: "details/:id",
                element: <APDetails />,
              },
            ],
          },
          {
            path: "matching",
            element: <FNMatching />,
            children: [
              {
                index: true,
                element: <FNMatchingTable />,
              },
              {
                path: "details/:id",
                element: <FNMatchingDetails />,
              },
            ],
          },
          {
            path: "goods-return",
            element: <GoodsReturn />,
            children: [
              {
                index: true,
                element: <GoodsReturnTable />,
              },
              {
                path: "details/:id",
                element: <GoodsReturnDetails />,
              },
            ],
          },
          {
            path: "goods-return-matching",
            element: <GoodsReturnMH />,
            children: [
              {
                index: true,
                element: <GoodsReturnMHTable />,
              },
              {
                path: "details/:id",
                element: <GoodsReturnMHDetails />,
              },
            ],
          },
          {
            path: "credit-memo",
            element: <CreditMemo />,
            children: [
              {
                index: true,
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
        path: "payments",
        element: (
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        ),
        children: [
       {
            index: true,
            element: <Navigate to="/sap/payments/tobe-paid" replace />
          },
          {
            path: "tobe-paid",
            element: <TobePaid />,
            children: [
              {
                index: true,
                element: <ToBePaidTable />,
              },
              {
                path: "details/:id/:paymentDate",
                element: <ToBePaidDetails />,
              },
            ],
          },
          {
            path: "completed-payments",
            element: <CompletedPts />,
            children: [
              {
                index: true,
                element: <CompletedPtsTable />,
              },
              {
                path: "details/:id/:paymentDate",
                element: <CompletedPtsDetails />,
              },
            ],
          },
        ],
      },

      {
        path: "inventory",
        element: (
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        ),
        children: [
             {
            index: true,
            element: <Navigate to="/sap/inventory/transfer" replace />
          },
          {
            path: "transfer",
            element: <Transfer />,
            children: [
              {
                index: true,
                element: <TransferTable />,
              },
              {
                path: "details/:id",
                element: <TransferDetails />,
              },
            ],
          },
          {
            path: "missing-qty",
            element: <InventoryMissingQty />,
            children: [
              {
                index: true,
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
        path: "items",
        element: (
          <ProtectedRoute>
            <Items />
          </ProtectedRoute>
        ),
        children: [
          {
                index: true,
            element: <ItemsTable />,
          },
          {
            path: "details/:id",
            element: <ItemDetails />,
          },
        ],
      },
      {
        path: "vendors",
        element: (
          <ProtectedRoute>
            <Vendors />
          </ProtectedRoute>
        ),
        children: [
             {
            index: true,
            element: <Navigate to="/sap/vendors/vendorsList" replace />
          },
          {
            path: "vendorsList",
            element: <VendorsList />,
            children: [
              {
                index: true,
                element: <VendorsListTable />,
              },
              {
                path: "details/:id",
                element: <VendorsListDetails />,
              },
            ],
          },
          {
            path: "creditNoteList",
            element: <CreditNote />,
            children: [
              {
                index: true,
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
        path: "alerts",
        element: (
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        ),
        children: [
          {
                index: true,
            element: <AlertsTable />,
          },
        ],
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        ),
        children: [
          {
                index: true,
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
