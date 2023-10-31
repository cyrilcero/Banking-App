import React, { useState, useEffect } from "react";
import ClientDashboard from "../components/ClientDashboard";
import GreetingDash from "../components/GreetingDash";
import { useNavigate } from "react-router-dom";

function AllTransaction({ amount, receiver, date }) {
  return (
    <ul className="transaction-list">
      <li>{date}</li>
      <li>{receiver}</li>
      <li>{amount}</li>
    </ul>
  );
}

function ClientOverview() {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
  const email = currentUser.email || "";
  const cashInHistory = JSON.parse(localStorage.getItem("CashInHistory")) || [];
  const transactionHistory = cashInHistory.filter((entry) => entry.sender === email );

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
          <h3>Transaction History</h3>
          <hr />
          {cashInHistory.map((entry, index) => (
            <AllTransaction
              key={index}
              amount={entry.amount}
              date={entry.date}
              receiver={entry.accountName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientOverview;
