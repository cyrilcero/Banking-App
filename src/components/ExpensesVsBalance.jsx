import React from 'react';
import { getLocalStorage } from '../utils/localStorage';
import { calcSpentPerUser, formatCurrency, formatPercentage } from '../utils/helpers';


function ExpensesVsBalance() {
  const user = getLocalStorage('CurrentUser');
  const totalExpenses = calcSpentPerUser(user.email);
    console.log(totalExpenses);
  
  const isOverspent = user.accountBalance < 0;

  return (
    <div className='expensesvsbalance'>
      <div className='progress-text'>
        <h4>Available Account Balance</h4>
        <h3 className={isOverspent ? 'isOverSpent' : ''}>{formatCurrency(+user.accountBalance)}</h3>

        <div className="progress-text">
          <h5>Total Spending: {formatCurrency(totalExpenses)}</h5>
        </div>
      </div>
    </div>
  );
}

export default ExpensesVsBalance;