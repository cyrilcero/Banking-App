import { getLocalStorage } from '../utils/localStorage';
import { calcSpentPerUser, formatCurrency, formatPercentage } from '../utils/helpers';
import { CircularProgressbar } from 'react-circular-progressbar';

function ExpensesVsBalance() {
  const user = getLocalStorage('CurrentUser');
  const totalExpenses = calcSpentPerUser(user.email);
  const remainingBalance = user.accountBalance - totalExpenses; 
  const isOverspent = remainingBalance < 0;
  const percentage = (totalExpenses / user.accountBalance) * 100;
  const customStyles = {
    path: {
      stroke: isOverspent ? '#ff5733' : '#2f3a54', 
      transition: 'stroke 1s ease-in-out', 
    },
    text: {
      fill: isOverspent ? '#ff5733' : '#2f3a54',
      fontWeight: '600',
    },
    trail: {
      stroke: isOverspent ? '#2f3a54' :'#d1ffbc',
    },
  };

  return (
    <div className='expensesvsbalance'>
      <div className="progress-text">
        <h4>Available Account Balance</h4>
        <h3>{formatCurrency(remainingBalance)}</h3>

        <div className="progress-text">
          <h5>Total Spending: {formatCurrency(totalExpenses)}</h5>
          {isOverspent && (
            <h5 className="overspent">Overspent: {formatCurrency(-remainingBalance)}</h5>
          ) }
        </div>
      </div>
      
      <div className="circprogress">
        <CircularProgressbar
          value={percentage}
          text={formatPercentage(percentage/100)}
          styles={customStyles}
        />
      </div>
    </div>
  );
}

export default ExpensesVsBalance;
