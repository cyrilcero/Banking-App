import React from 'react'
import ExpenseItem from './ExpenseItem'

function TableExpenses({ expenses, showWallet = true }) {
  return (
    <div className='table-expenses'>
      <table>
        <thead>
          <tr>
            {
              [
                'Name',
                'Amount',
                'Date',
                showWallet ? 'Wallet' : '',
              ].map((i, index) => (
                <th key={index}>{i}</th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            expenses.map((expense) => (
              <tr key={expense.id}>
                <ExpenseItem
                  expense={expense}
                  showWallet={showWallet}
                />
              </tr>
            ))
          }
        </tbody>

      </table> 
    </div>
  )
}

export default TableExpenses
