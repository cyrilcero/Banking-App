import React from 'react'
import ExpenseItem from './ExpenseItem'

function TableExpenses({ expenses, showWallet = true }) {
  return (
    <>
      <table>
        <div className="table-expenses">
          <thead>
            <div className="table-header">
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
            </div>
          </thead>

          <tbody>
            <div className="table-body">
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
            </div>
          </tbody>
        </div>
      </table> 
    </>
  )
}

export default TableExpenses
