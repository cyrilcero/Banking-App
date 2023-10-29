import React, { useEffect, useState } from "react";

function CashInHistory({ amount }) {
  return (
    <ul className="cashin-list">
      <li>Cash In</li>
      <li>+{amount}</li>
    </ul>
  );
}

export const CashInFunc = () => {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
  const userId = currentUser.accountID || "";

  const cashInHistory = JSON.parse(localStorage.getItem("CashInHistory")) || [];

  // Filter the history to only show entries for the current user
  const userHistory = cashInHistory.filter((entry) => entry.userId === userId);

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
};
