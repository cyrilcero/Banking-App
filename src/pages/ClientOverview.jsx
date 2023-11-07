import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";
import ClientDashboard from "../components/ClientDashboard";
import GreetingDash from "../components/GreetingDash";
import { formatCurrency } from "../utils/helpers";
import { formatCurrency } from "../utils/helpers";

function AllTransaction({ amount, type, date }) {
  return (
    <>
      <ul className="transaction-list">
        <li>{type}</li>
        <li>{date}</li>
        <li>{formatCurrency(amount)}</li>
      </ul>
    </>
  );
}

function ClientOverview() {
  const currentUser = getLocalStorage("CurrentUser") || {};
  const email = currentUser.email || "";
  const cashInHistory = getLocalStorage("CashInHistory") || [];
  const transactionHistory = cashInHistory.filter(
    (entry) => entry.userId === email || entry.sender === email
  );

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/create-account");
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <section className="client-overview">
      <GreetingDash />
      <ClientDashboard />

      <div className="panel2-overview">
        <div className="transactions-widget">
          <h1>Transaction History</h1>
          <hr />
          <div className="list-label">
          <h3>Transaction Type</h3>
          <h3>Date</h3>
          <h3>Amount</h3>
        </div>
          {transactionHistory.map((entry, index) => (
            <AllTransaction
              key={index}
              amount={entry.amount}
              date={entry.date}
              type={entry.type}
              receiver={entry.accountName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientOverview;
