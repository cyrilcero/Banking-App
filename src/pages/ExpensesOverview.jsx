import React from 'react';
import { toast } from 'react-toastify';
import { getLocalStorage } from '../utils/localStorage';
import { deleteItem } from '../utils/helpers';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import TableExpenses from '../components/TableExpenses';


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
  const navigate = useNavigate();

  return (
    <div className='expenses-overview'>
      <h1>All Expenses</h1>
      {
        expenses && expenses.length > 0 
        ? ( 
          <div>
            <h3>My Expenses</h3>
            <h6>({expenses.length} total)</h6>
            <TableExpenses expenses={expenses} />
          </div>
        ) // ...else
        : <p>No expenses to show.</p>
      }

      <button>
        <Link
          to="/"
          onClick={() => navigate(-1)}
        >
          <h5>Go back</h5>
        </Link>
      </button>     
    </div>
  )
}

export default ExpensesOverview
