import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

// Components
import CashInAdmin from "./components/CashInAdmin.jsx";
import ClientDashboard from "./components/ClientDashboard.jsx";
import {
  LoggedInRoute,
  SecuredRoute,
  SecuredAdminRoute,
} from "./components/SecuredRoute.jsx";

// Pages
import ClientOverview from "./pages/ClientOverview.jsx";
import LogInPage from "./pages/LoginPage.jsx";
import AdminDash from "./pages/AdminDash.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Loans from "./pages/Loans.jsx";
import Cards from "./pages/Cards.jsx";
import Insurance from "./pages/Insurance.jsx";
import Investments from "./pages/Investments.jsx";
import PromAndRe from "./pages/PromAndRe.jsx";
import AdminCreateAccount from "./pages/AdminCreateAccount.jsx";
import CashIn from "./pages/CashIn.jsx";
import Transfer from "./pages/Transfer.jsx";

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
  {
    path: "/cash-in/:id",
    element: <CashIn />,
    loader: ({params}) => params.id,
  },
  {
    path: '/cashinadmin',
    element: <CashInAdmin />
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
  },
  {
    path: "/test",
    element: <ClientDashboard />,
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
  {
    path: "admin/create-new-account",
    element: (
      <SecuredAdminRoute>
        <AdminCreateAccount />
      </SecuredAdminRoute>
    ),
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
