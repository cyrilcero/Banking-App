import React from 'react'
import ExpenseItem from './ExpenseItem'

function TableExpenses({ expenses, showWallet = true }) {
  return (
    <div className='table-expenses'>
      <table>
        <div className="table-head">
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
        </div>

        <div className="table-body">
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
        </div>
      </table> 
    </div>
  )
}

export default TableExpenses
