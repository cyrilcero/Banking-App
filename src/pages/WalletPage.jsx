import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getAllItems } from '../utils/localStorage';
import { budgetAppAction } from '../utils/budgetAppAction';
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
  return budgetAppAction({ request });
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
                <span>{wallet.name} </span>
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