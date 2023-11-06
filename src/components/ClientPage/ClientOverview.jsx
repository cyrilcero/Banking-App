import React, { useState, useEffect } from "react";
import ClientDashboard from "./ClientDashboard";
import {GreetingDash} from "../SharedComponent";
import { useNavigate } from "react-router-dom";

function AllTransaction({ amount, type, date }) {
  return (
    <ul className="transaction-list">
      <li>{type}</li>
      <li>{date}</li>
      <li>&#8369;{amount}</li>
    </ul>
  );
}

function ClientOverview() {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
  const email = currentUser.email || "";
  const cashInHistory = JSON.parse(localStorage.getItem("CashInHistory")) || [];
  const transactionHistory = cashInHistory.filter((entry) => entry.userId === email || entry.sender === email);

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
