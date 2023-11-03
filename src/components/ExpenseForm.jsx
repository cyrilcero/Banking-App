import React from 'react';
import { Form } from 'react-router-dom';


function ExpenseForm({ wallets }) {

  return (
    <div className='budgetform-wrapper'>
      <h2>Add an expense</h2>
      <Form
        method='post'
        className='budgetapp-form'
      >
        <div className="expense-inputs">
          <div className='budget-form-item'>
            <label htmlFor="newExpense">Expense Name</label>
            <input 
              type="text" 
              name='newExpense'
              id='newExpense'
              placeholder='e.g. coffee'
            />
          </div>
          <div className='budget-form-item'>
            <label htmlFor="newExpenseAmount">Expense Amount</label>
            <input 
              type="number" 
              name='newExpenseAmount'
              id='newExpenseAmount'
              placeholder='e.g. 10.00'
              inputMode="decimal"
              step='0.01'
              required
            />
          </div>
        </div>

        {
          wallets.length > 1 && (
            <div className="wallet-categ">
              <label htmlFor="newExpenseWallet">
                Wallet Label
              </label>
              <select 
                name="newExpenseWallet" 
                id="newExpenseWallet" 
                required
              >
                {
                  wallets
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .map((wallet) => {
                      return (
                        <option
                          key={wallet.id}
                          value={wallet.id}
                        >
                          {wallet.name}
                        </option>
                      )
                    })
                }
              </select>
            </div>
          )
        }

        <input 
          type="hidden" 
          name="_action"
          value="addExpense"
        />

        <button 
          type="submit" 
        >
          <span className="btn-text">Add</span>
        </button>

      </Form>
      
    </div>
  )
}

export default ExpenseForm;
