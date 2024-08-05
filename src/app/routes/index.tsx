import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import AuthGuard from "./auth.guard";
import BusinessGuard from "./businesss.guard";

import LayoutDashboard from "views/layout/dashboard";
import NotFound from "views/components/notFound";
import Login from "views/pages/auth/login";

const Register = lazy(() => import("views/pages/auth/register"));
const ForgotPassword = lazy(() => import("views/pages/auth/forgot-password"));

const Dashboard = lazy(() => import("views/pages/home/dashboard"));
const AddDocument = lazy(() => import("views/layout/add-document"));
const Invoice = lazy(() => import("views/pages/invoices"));
const AddInvoice = lazy(() => import("views/pages/invoices/add-invoice"));
const AddInvoiceBatch = lazy(() => import("views/pages/invoices/upload-batch"));
const Products = lazy(() => import("views/pages/products"));
const Receipts = lazy(() => import("views/pages/receipts"));
const AddReceipt = lazy(() => import("views/pages/receipts/add-receipt"));
const AddReceiptBatch = lazy(() => import("views/pages/receipts/upload-batch"));
const Customers = lazy(() => import("views/pages/customers"));
const AddCustomerForm = lazy(
  () => import("views/pages/customers/add-customer")
);
const AddCustomerBatch = lazy(
  () => import("views/pages/customers/upload-batch")
);
const Reports = lazy(() => import("views/pages/reports"));
const Settings = lazy(() => import("views/pages/settings"));
const AccountSetting = lazy(
  () => import("views/pages/settings/account-setting")
);
const BusinessSetting = lazy(
  () => import("views/pages/settings/business-setting")
);
const BankAccountSetting = lazy(
  () => import("views/pages/settings/bank-account-setting")
);
const SecuritytSetting = lazy(
  () => import("views/pages/settings/security-setting")
);

const routes: RouteObject[] = [
  {
    element: <Navigate to="/dashboard" />,
    path: "/"
  },
  {
    element: (
      <AuthGuard>
        <BusinessGuard>
          <LayoutDashboard />
        </BusinessGuard>
      </AuthGuard>
    ),
    children: [
      {
        element: <Dashboard />,
        path: "/dashboard"
      },
      {
        element: <Invoice />,
        path: "/invoices"
      },
      {
        element: <AddInvoiceBatch />,
        path: "/invoices/batch"
      },
      {
        element: <AddDocument />,
        path: "add-document",
        children: [
          {
            path: "receipt",
            element: <AddReceipt />
          },
          {
            path: "invoice",
            element: <AddInvoice />
          }
        ]
      },
      {
        element: <Products />,
        path: "/products"
      },
      {
        element: <Receipts />,
        path: "/receipts"
      },
      {
        element: <AddReceiptBatch />,
        path: "/receipts/batch"
      },
      {
        element: <Customers />,
        path: "/customers"
      },
      {
        element: <AddCustomerForm />,
        path: "/customers/add"
      },
      {
        element: <AddCustomerBatch />,
        path: "/customers/batch"
      },
      {
        element: <Reports />,
        path: "/reports"
      },
      {
        element: <Settings />,
        path: "/settings",
        children: [
          {
            element: <AccountSetting />,
            index: true
          },
          {
            element: <BusinessSetting />,
            path: "business"
          },
          {
            element: <BankAccountSetting />,
            path: "bank-account"
          },
          {
            element: <SecuritytSetting />,
            path: "security"
          }
        ]
      }
    ]
  },
  {
    element: <Login />,
    path: "/login"
  },
  {
    element: <Register />,
    path: "/register"
  },
  {
    element: <ForgotPassword />,
    path: "/forgotpassword"
  },
  {
    element: <NotFound />,
    path: "*"
  }
];

export default routes;
