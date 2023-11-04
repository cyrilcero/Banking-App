import React from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";
import { calcSpentPerWallet, formatCurrency, formatPercentage } from '../utils/helpers';


function WalletItem({ wallet }) {
  const { id, name, amount } = wallet;
  const spent = calcSpentPerWallet(id);
  const navigate = useNavigate();

  function handleSubmit(e) {
    if (!confirm("Are you sure you want to permanently delete this item?")) {
      e.preventDefault();
    }
  }

  function goToWalletPage() {
    navigate(`/budget-app/wallet/${id}`);
  };

  return (
    
    <div className='wallet-card'>
      <div className="progress-text" onClick={goToWalletPage}>
        <h4 className='wallet-name'>{name}</h4>
        <h4 className='align-left'>{formatCurrency(amount)} alloted</h4>
      </div>

      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>

      <div className="progress-text" onClick={goToWalletPage}>
        <h6>{formatCurrency(spent)} spent</h6>
        <h6 className='align-left'>{formatCurrency(amount - spent)} left</h6>
      </div>

      <div className='wallet-btns'>
        <Form
          method='post'
          onSubmit={handleSubmit}
        >
          <input 
            type="hidden" 
            name='formAction' 
            value='deleteWallet' 
          />

          <input 
            type="hidden" 
            name='walletID'
            value={wallet.id}
          />  

          <button type='submit'>
            <FaTrashCan />
          </button>

        </Form>
      </div>

        
    </div>
  )
}

export default WalletItem
