import React from 'react';
import { Form } from 'react-router-dom';


function BudgetForm() {
  
  return (
    <div className='budgetform-wrapper'>
      <h2>Create a wallet</h2>
      <Form
        method="post"
        className="wallet-form"
      >
        <div className='wallet-form-item'>
          <label htmlFor="newWallet">Wallet Name</label>
          <input 
            type="text" 
            name="newWallet"
            id="newWallet"
            placeholder="e.g. Food"
            required
          />
        </div>
        <div className="budget-form-item">
          <label htmlFor="newWalletAmount">Wallet Amount</label>
          <input 
            type="number" 
            name="newWalletAmount"
            id="newWalletAmount"
            placeholder="e.g. 1000.00"
            inputMode="decimal"
            step='0.01'
            required
          />
        </div>

        <input 
          type="hidden" 
          name="_action"
          value="createWallet"
        />

        <button 
          type="submit" 
          className="button-main"
        >
          <span className="btn-text">Create</span>
        </button>

      </Form>
      
    </div>
  )
}

export default BudgetForm
