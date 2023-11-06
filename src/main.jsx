import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import {
  ClientOverview,
  Dashboard,
  CashIn,
  Transfer,
  Signup,
  LogInPage,
  AdminDash,
  AdminCreateAccount,
  AdminOverviewContent,
  AdminAllAccounts,
  Home,
  Loans,
  Cards,
  Insurance,
  Investments,
  PromAndRe,
} from "./components";

import App from "./App";

import {
  LoggedInRoute,
  SecuredRoute,
  SecuredAdminRoute,
} from "./components/SharedComponent/SecuredRoute";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "loans",
        element: <Loans />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "insurance",
        element: <Insurance />,
      },
      {
        path: "investments",
        element: <Investments />,
      },
      {
        path: "promos-rewards",
        element: <PromAndRe />,
      },
    ],
  },
  {
    path: "/create-account",
    element: <Signup />,
  },
  {
    path: "/login",
    element: (
      <LoggedInRoute>
        <LogInPage />
      </LoggedInRoute>
    ),
  },

  // CLIENT SIDE

  {
    path: "/overview/:id",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: (
          <SecuredRoute>
            <ClientOverview />
          </SecuredRoute>
        ),
        loader: ({ params }) => params.id,
      },
      {
        path: "cash-in/:id",
        element: (
          <SecuredRoute>
            <CashIn />
          </SecuredRoute>
        ),
        loader: ({ params }) => params.id,
      },
      {
        path: "transfer/:id",
        element: (
          <SecuredRoute>
            <Transfer />
          </SecuredRoute>
        ),
        loader: ({ params }) => params.id,
      },
    ],
  },

  // ADMIN SIDE

  {
    path: "/admin",
    element: (
      <SecuredAdminRoute>
        <AdminDash />
      </SecuredAdminRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <SecuredAdminRoute>
            <AdminOverviewContent />
          </SecuredAdminRoute>
        ),
      },
      {
        path: "create-new-account",
        element: (
          <SecuredAdminRoute>
            <AdminCreateAccount />
          </SecuredAdminRoute>
        ),
      },
      {
        path: "all-accounts",
        element: (
          <SecuredAdminRoute>
            <AdminAllAccounts />
          </SecuredAdminRoute>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
