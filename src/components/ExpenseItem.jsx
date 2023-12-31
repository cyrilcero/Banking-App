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
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatCreatedAt(expense.createdAt)}</td>
      {
        showWallet && (<td>{wallet.name}</td>)
      }

      <td>
        <Form
          method='post'
          onSubmit={handleSubmit}
        >

          <input 
            type="hidden" 
            name='expenseID'
            value={expense.id}
          />

          <button 
            type='submit'
            name='formAction' 
            value='deleteExpense' 
            className='delete-btn'
          >
            <FaTrashCan />
          </button>
        </Form>
      </td>
    </>
  )
}

export default ExpenseItem
