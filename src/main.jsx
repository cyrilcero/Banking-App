import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css'; 
import 'react-circular-progressbar/dist/styles.css';

// Components
import CashInAdmin from "./components/CashInAdmin.jsx";
import { LoggedInRoute, SecuredRoute, SecuredAdminRoute,} from "./components/SecuredRoute.jsx";

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
import BudgetApp, { budgetAppActions, budgetAppLoader } from "./pages/BudgetApp.jsx";
import BudgetAppLayout from "./layout/BudgetAppLayout.jsx";
import WalletPage, { walletAction, walletLoader } from "./pages/WalletPage.jsx";
import AdminOverviewContent from "./pages/AdminOverviewContent.jsx";
import Settings from "./pages/Settings.jsx";
import AdminAllAccounts from "./pages/AdminAllAccounts.jsx";
import AdminSendMoney from "./pages/AdminSendMoney.jsx";



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
      {
        path: "settings/:id",
        element: (
          <SecuredRoute>
            <Settings />
          </SecuredRoute>
        ),
        loader: ({ params }) => params.id,
      },
      {
        path: 'budget-app/:id',
        element: <BudgetAppLayout />,
        children: [
          {
            index: true,
            element: <BudgetApp />,
            loader: budgetAppLoader,
            action: budgetAppActions,
          },
          {
            path: 'wallet/:id',
            element: <WalletPage />,
            loader: walletLoader,
            action: walletAction,
          },
        ],
      },
    ],
  },

  // ADMIN SIDE
  {
    path: "cash-in/:id",
    element: <CashIn />,
    loader: ({ params }) => params.id,
  },
  {
    path: "transfer/:id",
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
        children: [
          {
            path: "create-new-account",
            element: (
              <SecuredAdminRoute>
                <AdminCreateAccount />
              </SecuredAdminRoute>
            ),
          },
          {
            path: 'cashinadmin',
            element: <CashInAdmin />
          },
        ],
      },
      {
        path: "send-money",
        element: (
          <SecuredAdminRoute>
            <AdminSendMoney />
          </SecuredAdminRoute>
        ),
    
      },
    ],
  },

  

  // Budget App Test Route
  // {
  //   path: 'budget-app', // mother page
  //   element: <BudgetAppLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <BudgetApp />,
  //       loader: budgetAppLoader,
  //       action: budgetAppActions,
  //     },
  //     {
  //       path: 'wallet/:id',
  //       element: <WalletPage />,
  //       loader: walletLoader,
  //       action: walletAction,
  //     },
  //   ],
  // },

]);

root.render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>

);
