import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";
import { calcSpentPerWallet, formatCurrency, formatPercentage } from '../utils/helpers';
import { getLocalStorage } from '../utils/localStorage';


function WalletItem({ wallet }) {
  const { id, name, amount } = wallet;
  const spent = calcSpentPerWallet(id);
  const navigate = useNavigate();
  let isOverSpent = spent > amount; 
  

  function handleSubmit(e) {
    if (!confirm("Are you sure you want to permanently delete this item?")) {
      e.preventDefault();
    }
  }

  function goToWalletPage() {
    navigate(`wallet/${id}`);
  };

  return (    
    <div className='wallet-card'>
      <div className="progress-text" onClick={goToWalletPage}>
        <h4 className='wallet-name'>{name}</h4>
        <h4 className='align-left'>{formatCurrency(amount)} alloted</h4>
      </div>

      <progress className={isOverSpent ? 'isOverSpent' : ''} max={amount} value={spent} onClick={goToWalletPage} >
        {formatPercentage(spent / amount)}
      </progress>

      <div className="progress-text" onClick={goToWalletPage}>
        <h6>{formatCurrency(spent)} spent</h6>
        <h6 className={`align-left ${isOverSpent ? 'isOverSpent' : ''}`}>
          {isOverSpent
            ? formatCurrency(amount - spent) + ' overspent'
            : formatCurrency(amount - spent) + ' left'}
        </h6>        
      </div>

      <div className='wallet-btns'>
        <Form
          method='post'
          onSubmit={handleSubmit}
        >
          
          <input 
            type="hidden" 
            name='walletID'
            value={wallet.id}
          />  

          <button 
            type='submit' 
            name='formAction' 
            value='deleteWallet' 
          >
            <FaTrashCan />
          </button>

        </Form>
      </div>

        
    </div>
  )
}

export default WalletItem