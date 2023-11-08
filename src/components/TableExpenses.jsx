import React from 'react'
import ExpenseItem from './ExpenseItem'

function TableExpenses({ expenses, showWallet = true }) {
  
  return (
    <div className="table-expenses">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            {showWallet ? <th>Wallet</th> : null}
            <th></th>
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
