import React from "react";

function CashInHistory({ amount }) {
  return (
    <ul className="cashin-list">
      <li>Cash In</li>
      <li>+{amount}</li>
    </ul>
  );
}

export default function CashInFunc() {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
  const email = currentUser.email || "";

  const cashInHistory = JSON.parse(localStorage.getItem("CashInHistory")) || [];
// because withdrawal is set to be false that is why deposit in cashinhistory is also false
  const userHistory = cashInHistory.filter((entry) => entry.userId === email && entry.deposit === false);

  return (
    <>
      <div className="cashin-history">
        <h1>Cash In History</h1>
        <button className="cashin-btn">Cash In</button>
      </div>
      <hr className="cashin-lines" />

      {userHistory.map((entry, index) => (
        <CashInHistory key={index} amount={entry.amount} />
      ))}
    </>
  );
}
