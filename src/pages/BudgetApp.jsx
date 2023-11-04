import React, { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import '../App.css';
import { getLocalStorage } from '../utils/localStorage';
import { budgetAppAction } from '../utils/budgetAppAction';

// Components
import GreetingDash from '../components/GreetingDash';
import BudgetForm from '../components/BudgetForm';
import ExpenseForm from '../components/ExpenseForm';
import WalletItem from '../components/WalletItem';
import TableExpenses from '../components/TableExpenses';
import ExpensesVsBalance from '../components/ExpensesVsBalance';
import ExpensesModal from './ExpensesModal';

// Loaders
export function budgetAppLoader() {
  const wallets = getLocalStorage('wallets');
  const expenses = getLocalStorage('expenses');

  return { wallets, expenses };
}

// Actions
export function budgetAppActions({ request }) {
  return budgetAppAction({ request });
}

function BudgetApp() {
  const { wallets, expenses } = useLoaderData();
  const [isBudgetForm, setIsBudgetForm] = useState(false);
  const [isExpensesModalOpen, setIsExpensesModalOpen] = useState(false);

  const changeFormType = () => {
    setIsBudgetForm(!isBudgetForm);
  };

  const openExpensesModal = () => {
    setIsExpensesModalOpen(true);
  };

  const closeExpensesModal = () => {
    setIsExpensesModalOpen(false);
  };

  return (
    <section className='budget-app'>
      <GreetingDash />
      <p>
        Welcome to Wind Bank's Budget App! Create a wallet for each of your budget category and start tracking your expenses.
      </p>
      <div className='budget-app-container'>
        {wallets && wallets.length > 0 ? (
          <div className='budget-app-wrapper'>
            <div className="mywallets-wrapper">
              <h2>
                {wallets && wallets.length > 1 ? "My Wallets" : "My Wallet"}
              </h2>

              <div className="wallet-wrapper">
                {wallets.map((wallet) => (
                  <WalletItem key={wallet.id} wallet={wallet} />
                ))}
              </div>
            </div>
            <div className='forms-wrapper'>
              {isBudgetForm ? (<BudgetForm/>) : (<ExpenseForm wallets={wallets}/>)}

              <h5 onClick={changeFormType}>
                {isBudgetForm ? "Add an expense here" : "Create a new wallet here"}
              </h5>
            </div>
            <div className='overall-expenses'>
              <ExpensesVsBalance />
            </div>
            {expenses && expenses.length > 0 && (
              <div className='recent-expenses-wrapper'>
                <h3>Recent Expenses</h3>
                <TableExpenses
                  expenses={expenses
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 3)}
                />
                {expenses.length > 3 && (
                  <button className='btn-text' onClick={openExpensesModal}>
                    View all expenses
                  </button>
                )}
              </div>
            )}
            <ExpensesModal isOpen={isExpensesModalOpen} onClose={closeExpensesModal} />
          </div>
        ) : (
          <div>
            <BudgetForm />
          </div>
        )}
      </div>
    </section>
  );
}

export default BudgetApp;
