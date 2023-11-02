import React from 'react';
import { getAllItems } from '../utils/localStorage';
import { toast } from 'react-toastify';
import { addExpense, deleteItem } from '../utils/helpers';
import { useLoaderData } from 'react-router-dom';
import WalletItem from '../components/WalletItem';
import ExpenseForm from '../components/ExpenseForm';
import TableExpenses from '../components/TableExpenses';

// Loader
export function walletLoader({params}) {
  const wallet = getAllItems({
    category: 'wallets',
    key: 'id',
    value: params.id,
  })[0];

  const expenses = getAllItems({
    category: 'expenses',
    key: 'walletID',
    value: params.id,
  });

  if (!wallet) {
    throw new Error('The wallet you are looking for does not exist.')
  }

  return { wallet, expenses };
};

// Action
export async function walletAction({ request }) {
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);

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

function WalletPage() {
  const { wallet, expenses } = useLoaderData();

  return (
    <div className='budget-app wallet-page'>
      <h2>
        <span className='accent'>{wallet.name} </span>
        Overview
      </h2>

      <div>
        <WalletItem wallet={wallet} />
        <ExpenseForm wallets={[wallet]} />
      </div>

      <div>
        {
          expenses && expenses.length > 0
          ? (
            <div>
              <h2>
                <span className='accent'>{wallet.name} </span>
                Expenses
              </h2>
              <TableExpenses expenses={expenses} showWallet={false} />
            </div>
          ) : <p>No expenses to show for this wallet.</p>
        }
      </div>
      
    </div>
  )
}

export default WalletPage
