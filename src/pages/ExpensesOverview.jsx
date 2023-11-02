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

        <button className='back-btn'>
          <Link
            onClick={() => navigate(-1)}
          >
            <h5>Go back</h5>
          </Link>
        </button>    
      </div>
    </div>
  )
}

export default ExpensesOverview
