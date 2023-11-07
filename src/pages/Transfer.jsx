import { getLocalStorage } from "../utils/localStorage";
import GreetingDash from "../components/GreetingDash";
import BalanceOverview from "../components/BalanceOverview";
import TransferFunc from "../components/TransferFunc";
import { formatCurrency } from "../utils/helpers";

function TransferHistory({ amount, receiver }) {
  return (
    <ul className="transfer-history-list">
      <li>Money Transferred</li>
      <li>{receiver}</li>
      <li>{formatCurrency(+amount)}</li>
    </ul>
  );
}

function Transfer() {
  const currentUser = getLocalStorage("CurrentUser") || {};
  const email = currentUser.email || "";

  const cashInHistory = getLocalStorage("CashInHistory") || [];
  const transferHistory = cashInHistory.filter(
    (entry) => entry.sender === email && entry.transfer === true
  );

  return (
    <section className="transfer">
      <GreetingDash />
      <div className="transfer-page">
        <div className="transfer-form-container">
          <TransferFunc />
        </div>
        <div className="panel2-transfer">
          <BalanceOverview />
          <div className="transfer-history">
            <h1>Transfer History</h1>
            <hr />
            {transferHistory.map((entry, index) => (
              <TransferHistory
                key={index}
                amount={entry.amount}
                receiver={entry.accountName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transfer;
