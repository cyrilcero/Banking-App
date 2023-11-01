import React from 'react';
import { calcSpentPerWallet, formatCurrency, formatPercentage } from '../utils/helpers';
import { Form, Link } from 'react-router-dom';


function WalletItem({ wallet, showDeleteBtn = false }) {
  const { id, name, amount } = wallet;
  const spent = calcSpentPerWallet(id);

  function handleSubmit(e) {
    if (!confirm('Are you sure you want to delete this wallet?')) {
      e.preventDefault();
    }
  };

  return (
    <div className='wallet'>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} alloted</p>
      </div>

      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>

      <div className="progress-text">
        <h6>{formatCurrency(spent)} spent</h6>
        <h6>{formatCurrency(amount - spent)} left</h6>
      </div>

      {
        showDeleteBtn ? 
        (
          <div>
            <Form
              method='post'
              action='delete'
              onSubmit={handleSubmit()}
            >
              <button type='submit'>
                <span>Delete Wallet</span>
              </button>
            </Form>
          </div>
        ) // ...else
        : (
          <div>
            <Link
              to={`budget-app/wallet/${id}`}
              className='btn'
            >
              <span>View Details</span>
            </Link>
          </div>
        )
      }
     
    </div>
  )
}

export default WalletItem
