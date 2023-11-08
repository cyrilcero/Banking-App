import React from 'react';
// import { useLoaderData } from 'react-router-dom';
// import { getAllItems, getLocalStorage } from '../utils/localStorage';
// import { budgetAppAction } from '../utils/budgetAppAction';
// import TableExpenses from './TableExpenses';
import WalletPage from '../pages/WalletPage';


// // Loader
// export function walletLoader() {
//   const wallet = getAllItems({
//     category: 'wallets',
//     key: 'id',
//     value: params.id,
//   })[0];

//   const expenses = getAllItems({
//     category: 'expenses',
//     key: 'walletID',
//     value: params.id,
//   });

//   return { wallet, expenses };
// };

// // Action
// export async function expensesAction(request) {
//   return budgetAppAction({ request });
// };


// function ExpensesOverview() {
//   const { expenses } = useLoaderData();

//   return (
//     <div className='expenses-overview'>
//       <h2>My Expenses</h2>
//       <h4>({expenses.length} total)</h4>

//       <div className='recent-expenses-wrapper'>
//         {
//           expenses && expenses.length > 0 
//           ? ( 
//             <div className='expensesoview-table'>
//               <TableExpenses expenses={expenses} />
//             </div>
//           ) // ...else
//           : <p>No expenses to show.</p>
//         }   
//       </div>
//     </div>
//   )
// }

function ExpensesModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="expenses-modal">
      <div className="expenses-modal-content">
        <WalletPage />
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );

};

export default ExpensesModal