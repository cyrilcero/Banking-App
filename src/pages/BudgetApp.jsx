import React, { useState } from 'react';
import '../App.css';
import { toast } from 'react-toastify';
import { getLocalStorage } from '../utils/localStorage';
import { Link, useLoaderData } from 'react-router-dom';

// Components
import GreetingDash from '../components/GreetingDash';
import BudgetForm from '../components/BudgetForm';
import { addExpense, createWallet, deleteItem, deleteWallet } from '../utils/helpers';
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
};

// Action
export async function budgetAppAction({ request }) {
  const data = await request.formData();
  const { formAction, ...values } = Object.fromEntries(data);
  const user = getLocalStorage('CurrentUser');

  // create a wallet
  if (formAction === 'createWallet') {
    try {
      createWallet({
        name: values.newWallet,
        amount: values.newWalletAmount,
        email: user.email,
      });

      return toast.success(`Wallet ${values.newWallet.toLowerCase()} created!`);
      
    } catch (error) {
      throw new Error('Hmm, seems like there is a problem creating your wallet.');
    }
  };

  // add an expense
  if (formAction === 'addExpense') {
    try {
      addExpense({
        email: user.email,
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
  if (formAction === 'deleteExpense') {
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

  // delete wallet
  if (formAction === 'deleteWallet') {
    try {
      deleteWallet(values.walletID);
      
      toast.success('Wallet deleted!');
    } catch (error) {
      throw new Error('There was a problem deleting your wallet.'); 
    }
  }

  return null;   
};


function BudgetApp() {
  const { wallets, expenses } = useLoaderData();
  const [isBudgetForm, setIsBudgetForm] = useState(false);
  const [isExpensesModalOpen, setIsExpensesModalOpen] = useState(false);

  const handleForm = () => {
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
        {
          wallets && wallets.length > 0 ?
            (
              <div className='budget-app-wrapper'>
                <div className="mywallets-wrapper">
                  <h2>
                    {wallets && wallets.length > 1 ? "My Wallets" : "My Wallet"}
                  </h2>

                  <div className="wallet-wrapper">
                    {
                      wallets.map((wallet) => (
                        <WalletItem 
                          key={wallet.id} 
                          wallet={wallet} 
                        />
                      ))
                    }
                  </div>
                </div>
                <div className='forms-wrapper'>

                  {
                    isBudgetForm ? (<BudgetForm/>) : (<ExpenseForm wallets={wallets} />)
                  }

                  <h5 onClick={handleForm}>
                    { isBudgetForm ? "Add an expense here" : "Create new wallet here" }
                  </h5>
                </div>

                <div className='overall-expenses'>
                  <ExpensesVsBalance />
                </div>

                {
                  expenses && expenses.length > 0 &&
                  (
                    <div className='recent-expenses-wrapper'>
                      <h3>Recent Expenses</h3>
                      <TableExpenses
                        expenses={expenses
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 3)}
                      />
                      {expenses.length > 3 && (
                        <button
                          className='btn-text'
                          onClick={openExpensesModal}
                        >
                          View all expenses
                        </button>
                      )}
                    </div>
                  )}

                  <ExpensesModal 
                    isOpen={isExpensesModalOpen} 
                    onClose={closeExpensesModal}
                  />
              </div>
            )
            // ...else
            : (
              <div>
                <BudgetForm />
              </div>
            )
        }
      </div>
    </section>
  )
}

export default BudgetApp
