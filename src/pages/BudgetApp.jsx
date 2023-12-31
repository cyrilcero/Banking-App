import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "../App.css";
import { getLocalStorage } from "../utils/localStorage";
import { budgetAppAction } from "../utils/budgetAppAction";

// Components
import GreetingDash from "../components/GreetingDash";
import BudgetForm from "../components/BudgetForm";
import ExpenseForm from "../components/ExpenseForm";
import WalletItem from "../components/WalletItem";
import TableExpenses from "../components/TableExpenses";
import ExpensesVsBalance from "../components/ExpensesVsBalance";

// Loaders
export function budgetAppLoader() {
  const wallets = getLocalStorage("wallets");
  const expenses = getLocalStorage("expenses");
  const user = getLocalStorage("CurrentUser");

  return { wallets, expenses, user };
}

// Actions
export function budgetAppActions({ request }) {
  return budgetAppAction({ request });
}

function BudgetApp() {
  const { wallets, expenses, user } = useLoaderData();
  const [isBudgetForm, setIsBudgetForm] = useState(false);
  const userWallets = (wallets || []).filter((wallet) => wallet.email === user.email);
  const userExpenses = (expenses || []).filter(
    (expense) => expense.email === user.email
  );

  const changeFormType = () => {
    setIsBudgetForm(!isBudgetForm);
  };

  return (
    <section className="budget-app">
      <GreetingDash />
      <div className="budget-app-container">
        {userWallets && userWallets.length > 0 ? (
          <div className="budget-app-wrapper">
            <div className="mywallets-wrapper">
              <h2>
                {userWallets && userWallets.length > 1
                  ? "My Wallets"
                  : "My Wallet"}
              </h2>

              <div className="wallet-wrapper">
                {userWallets.map((wallet) => (
                  <WalletItem key={wallet.id} wallet={wallet} />
                ))}
              </div>
            </div>
            <div className="forms-wrapper">
              {isBudgetForm ? (
                <BudgetForm />
              ) : (
                <ExpenseForm wallets={wallets} />
              )}

              <h5 onClick={changeFormType}>
                {isBudgetForm
                  ? "Add an expense here"
                  : "Create a new wallet here"}
              </h5>
            </div>
            <div className="overall-expenses">
              <ExpensesVsBalance />
            </div>
            {expenses && expenses.length > 0 && (
              <div className="recent-expenses-wrapper">
                <h3>Recent Expenses</h3>
                <TableExpenses
                  expenses={userExpenses.sort(
                    (a, b) => b.createdAt - a.createdAt
                  )}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="welcome-budget-app">
            <div className="text-box">
              <h2>Welcome to WindBank's Budget App!</h2>
              <p>
                Create a wallet for each of your budget category and start
                tracking your expenses.
              </p>
            </div>
            <div className="form-box">
              <BudgetForm />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BudgetApp;
