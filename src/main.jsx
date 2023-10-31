import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Navbar from "./components/NavBar.jsx";
import Navbar from "./components/NavBar.jsx";

// Pages
import App from "./App.jsx";
import ClientOverview from "./pages/ClientOverview.jsx";
import LogInPage from "./pages/LoginPage.jsx";
import AdminDash from "./pages/AdminDash.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ClientDashboard from "./components/ClientDashboard.jsx";
import Home from "./pages/Home.jsx";
import Loans from "./pages/Loans.jsx";
import Cards from "./pages/Cards.jsx";
import Insurance from "./pages/Insurance.jsx";
import Investments from "./pages/Investments.jsx";
import PromAndRe from "./pages/PromAndRe.jsx";
import AdminCreateAccount from "./pages/AdminCreateAccount.jsx";
import AdminOverviewContent from "./pages/AdminOverviewContent.jsx";

import {
  LoggedInRoute,
  SecuredRoute,
  SecuredAdminRoute,
} from "./components/SecuredRoute.jsx";


import "./App.css"
import AdminAllAccounts from "./pages/AdminAllAccounts.jsx";

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
      
    ],
  },

  // ADMIN SIDE
  {
    path: "/cash-in/:id",
    element: <CashIn />,
    loader: ({ params }) => params.id,
    
  },
  {
    path: "/transfer/:id",
    element: <Transfer/>,
    loader: ({ params }) => params.id,
    
  },
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
