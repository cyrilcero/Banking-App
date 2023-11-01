import React from 'react';
import '../App.css';
import { toast } from 'react-toastify';
import { getLocalStorage } from '../utils/localStorage';
import { Link, useLoaderData } from 'react-router-dom';

// Components
import GreetingDash from '../components/GreetingDash';
import BudgetForm from '../components/BudgetForm';
import { addExpense, createWallet, deleteItem } from '../utils/helpers';
import ExpenseForm from '../components/ExpenseForm';
import WalletItem from '../components/WalletItem';
import TableExpenses from '../components/TableExpenses';

// Loaders
export function budgetAppLoader() {
  const wallets = getLocalStorage('wallets');
  const expenses = getLocalStorage('expenses');

  return { wallets, expenses };
};

// Action
export async function budgetAppAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // create a wallet
  if (_action === 'createWallet') {
    try {
      createWallet({
        name: values.newWallet,
        amount: values.newWalletAmount,
      });

      return toast.success(`Wallet ${values.newWallet.toLowerCase()} created!`);
      
    } catch (error) {
      throw new Error('Hmm, seems like there is a problem creating your wallet.');
    }
  };

  // add an expense
  if (_action === 'addExpense') {
    try {
      addExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        walletID: values.newExpenseWallet,
      });

      return toast.success(`Expense ${values.newExpense.toLowerCase()} added!`);
      
    } catch (error) {
      throw new Error('Hmm, seems like there is a problem adding your expense.');
    }
  };

  // delete expense item
  if (_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseID,
      });

      return toast.success('Expense deleted!')
    } catch (error) {
      throw new Error("There was a problem deleting your expense.")
    }
  }
};


function BudgetApp() {
  const { wallets, expenses } = useLoaderData();

  return (
    <section className='budget-app'>
      <GreetingDash />
      <p>
        Welcome to Wind Bank's Budget App! Create a wallet for each of your budget category and start tracking your expenses.
      </p>

      {
        wallets && wallets.length > 0 ?
          (
            <div>
              <div>
                <BudgetForm />
                <ExpenseForm wallets={wallets} />
              </div>

              <h2>
                {wallets && wallets.length > 1 ? "My Wallets" : "My Wallet"}
              </h2>

              <div className="wallets-wrapper">
                {
                  wallets.map((wallet) => (
                    <WalletItem 
                      key={wallet.id} 
                      wallet={wallet} 
                    />
                  ))
                }
              </div>
              {
                expenses && expenses.length > 0 &&
                (
                  <div>
                    <h3>Recent Expenses</h3>
                    <TableExpenses
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 5)}
                    />
                    {expenses.length > 5 && (
                      <Link
                        to='/budget-app/expenses'
                        className='btn-text'
                      >
                        View all expenses
                      </Link>
                    )}
                  </div>
                )
              }
            </div>
          )
          // ...else
          : (
            <div>
              <BudgetForm />
            </div>
          )
      }
      
    </section>
  )
}

export default BudgetApp
