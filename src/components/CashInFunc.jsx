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
  const cashInHistory = JSON.parse(localStorage.getItem('CashInHistory')) || [];

  return (
    <>
      <div className="cashin-history">
        <h1>Cash In History</h1>
        <button className="cashin-btn">Cash In</button>
      </div>
      <hr className="cashin-lines" />

      {cashInHistory.map((balance, index) => (
        <CashInHistory key={index} amount={balance.amount} />
      ))}
    </>
  );
};
