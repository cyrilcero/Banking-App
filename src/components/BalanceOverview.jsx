import { getLocalStorage } from "../utils/localStorage";
import { formatCurrency } from "../utils/helpers";

function BalanceOverview() {
  const user = getLocalStorage('CurrentUser');

  return (
    <div className="balance-overview">
      <div className="account-details">
        <h1>SAVINGS ACCOUNT</h1>
        <h2 className="account-id">{user.accountID}</h2>
      </div>

      <div className="account-balance">
        <h3 className="current-balance">
          {formatCurrency(+user.accountBalance)}
        </h3>
        <span>AVAILABLE BALANCE</span>
      </div>
    </div>
  );
}

export default BalanceOverview;
