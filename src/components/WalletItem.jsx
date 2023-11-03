import React from 'react';
import { calcSpentPerWallet, formatCurrency, formatPercentage } from '../utils/helpers';
import { Form, Link } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";


function WalletItem({ wallet }) {
  const { id, name, amount } = wallet;
  const spent = calcSpentPerWallet(id);

  return (
    
    <div className='wallet-card'>
      <Link to={`budget-app/wallet/${id}`}>
        <div className="progress-text">
          <h4 className='wallet-name'>{name}</h4>
          <h4 className='align-left'>{formatCurrency(amount)} alloted</h4>
        </div>

        <progress max={amount} value={spent}>
          {formatPercentage(spent / amount)}
        </progress>

        <div className="progress-text">
          <h6>{formatCurrency(spent)} spent</h6>
          <h6 className='align-left'>{formatCurrency(amount - spent)} left</h6>
        </div>
      </Link>

      <div className='wallet-btns'>
        <Form
          method='post'
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
