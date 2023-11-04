import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLocalStorage } from '../utils/localStorage';
import { deleteItem } from '../utils/helpers';
import TableExpenses from './TableExpenses';


// Loader
export function expensesLoader() {
  const expenses = getLocalStorage('expenses');

  return { expenses };
};

// Action
export async function expensesAction(request) {
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);
  
  // delete expense item submission
  if (_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseID,
      });

      return toast.success('Expense deleted!')
    } catch (e) {
      throw new Error("There was a problem deleting your expense.")
    }
  }
};


function ExpensesOverview() {
  const { expenses } = useLoaderData();

  return (
    <div className='expenses-overview'>
      <h2>My Expenses</h2>
      <h4>({expenses.length} total)</h4>

      <div className='recent-expenses-wrapper'>
        {
          expenses && expenses.length > 0 
          ? ( 
            <div className='expenses-table'>
              <TableExpenses expenses={expenses} />
            </div>
          ) // ...else
          : <p>No expenses to show.</p>
        }   
      </div>
    </div>
  )
}

function ExpensesModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="expenses-modal">
      <div className="expenses-modal-content">
        <ExpensesOverview />
        <button className="back-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );

};

export default ExpensesModal