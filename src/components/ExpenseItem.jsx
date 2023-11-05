import React from 'react'
import { getAllItems } from '../utils/localStorage'
import { Form } from 'react-router-dom';
import { formatCreatedAt, formatCurrency } from '../utils/helpers';
import { FaTrashCan } from "react-icons/fa6";

function ExpenseItem({ expense, showWallet }) {
  const wallet = getAllItems({
    category: 'wallets',
    key: 'id',
    value: expense.walletID,
  })[0];

  function handleSubmit(e) {
    if (!confirm("Are you sure you want to permanently delete this item?")) {
      e.preventDefault();
    }
  };

  return (
    <div className='td-line'>
      <td>
      <div className='td-text'>
        {expense.name}
      </div>
      </td>

      <td>
        <div className="td-numbers">
          {formatCurrency(expense.amount)}
        </div>
      </td>

      <td>
        <div className="td-numbers">
          {formatCreatedAt(expense.createdAt)}
        </div>
      </td>

      {
        showWallet && (
          <td>
            <div className='td-text'>
             {wallet.name}
            </div>
          </td>
        )
      }

      <td>
        <div className="td-btn">
          <Form
            method='post'
            onSubmit={handleSubmit}
          >
            <input 
              type="hidden" 
              name='formAction' 
              value='deleteExpense' 
            />

            <input 
              type="hidden" 
              name='expenseID'
              value={expense.id}
            />

            <button 
              type='submit'
              className='delete-btn'
            >
              <FaTrashCan />
            </button>
          </Form>
        </div>
      </td>

    </div>
  )
}

export default ExpenseItem
