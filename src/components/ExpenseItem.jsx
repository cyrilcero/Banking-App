import React from 'react'
import { getAllItems } from '../utils/localStorage'
import { Form, Link } from 'react-router-dom';
import { formatCreatedAt, formatCurrency } from '../utils/helpers';

function ExpenseItem({ expense, showWallet }) {
  const wallet = getAllItems({
    category: 'wallets',
    key: 'id',
    value: expense.walletID,
  })[0];

  return (
    <>
      <td>
        {expense.name}
      </td>

      <td>
        {formatCurrency(expense.amount)}
      </td>

      <td>
        {formatCreatedAt(expense.createdAt)}
      </td>

      {
        showWallet && (
          <td>
            <Link
              to={`budget-app/wallet/${wallet.id}`}
            >
              {wallet.name}
            </Link>
          </td>
        )
      }

      {/* delete expense item */}
      <td>
        <Form
          method='post'
        >
          <input 
            type="hidden" 
            name='_action' 
            value='deleteExpense' 
          />

          <input 
            type="hidden" 
            name='expenseID'
            value={expense.id}
          />

          <button 
            type='submit'
            aria-label={`Delete ${expense.name} expense`}
          >
            Delete
          </button>

        </Form>
      </td>

    </>
  )
}

export default ExpenseItem
