import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getAllItems } from '../utils/localStorage';
import { budgetAppAction } from '../utils/budgetAppAction';
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

  return { wallet, expenses };
};

// Action
export async function walletAction({ request }) {
  return budgetAppAction({ request });
  };


function WalletPage() {
  const { wallet, expenses } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className='wallet-page'>
      {
        expenses && expenses.length > 0
        ? (
          <div className='wallet-page-content'>
            <h2>
              <span>{wallet.name} </span>
              Expenses
            </h2>

            <div className="expenses-wrapper">
              <TableExpenses expenses={expenses} showWallet={false} />
            </div>

            <button 
              className="close-btn"
              onClick={() => navigate(-1)}
            >
              X
            </button>
          </div>
        ) 
        : (
          <div className="no-wallet">
            <h4>Hmm, no expenses to show for this wallet.</h4>
            <button 
              className="close-btn"
              onClick={() => navigate(-1)}
            >
              X
            </button>
          </div>
          )
      }     
    </div>
  )
}

export default WalletPage