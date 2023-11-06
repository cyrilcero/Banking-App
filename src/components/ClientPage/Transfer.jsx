import React from "react";
import {GreetingDash} from "../SharedComponent";
import BalanceOverview from "./BalanceOverview";
import TransferFunc from "./TransferFunc";

function TransferHistory({ amount, receiver }) {
  return (
    <ul className="transfer-history-list">
      <li>Money Transfered</li>
      <li>{receiver}</li>
      <li>&#8369;{amount}</li>
    </ul>
  );
}

function Transfer() {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
  const email = currentUser.email || "";

  const cashInHistory = JSON.parse(localStorage.getItem("CashInHistory")) || [];
  const transferHistory = cashInHistory.filter((entry) => entry.sender === email && entry.transfer === true);

  return (
    <section className="transfer">
      <GreetingDash />
      <div className="transfer-page">
        <div className="transfer-form-container">
          <TransferFunc/>
        </div>
        <div className="panel2-transfer">
            <BalanceOverview />
          <div className="transfer-history">
          <h1>Transfer In History</h1>
          <hr/>
            {transferHistory.map((entry, index) => (
        <TransferHistory key={index} amount={entry.amount} receiver={entry.accountName}/>
      ))}</div>
        </div>
      </div>
    </section>
  );
}

export default Transfer;
