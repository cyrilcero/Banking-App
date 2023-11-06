import React, { useState } from 'react';
import { getLocalStorage } from '../utils/localStorage';
import cashInIcon from "../assets/cashin-icon.png";
import GreetingDash from "../components/GreetingDash";
import ClientDashboard from "../components/ClientDashboard";


function CashInHistory({ amount }) {
  return (
    <ul className="cashin-list">
      <li>Cash In</li>
      <li>+{amount}</li>
    </ul>
  );
}

function CashIn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = getLocalStorage("CurrentUser") || {};
  const email = currentUser.email || "";

  const cashInHistory = getLocalStorage("CashInHistory") || [];

  const userHistory = cashInHistory.filter((entry) => entry.userId === email && entry.deposit === false);

  function toggleModal() {
    setIsModalOpen(true);
  }

  function close() {
    setIsModalOpen(false);
  }

  return (
    <section className="cash-in">
      <GreetingDash />
      <ClientDashboard />
      <div className="panel2-cashin">
        <div className="transactions-cashin">
          <div className="cashin-history">
            <h1>Cash In History</h1>
            <button className="cashin-btn" onClick={toggleModal}>Cash In</button>
          </div>
          <hr className="cashin-lines" />
          {userHistory.map((entry, index) => (
            <CashInHistory key={index} amount={entry.amount} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="cashin-modal">
          <div className="cashin-modal-content">
            <h2>New Feature!!</h2>
            <p>This feature is not yet ready. Please go to the nearest bank to deposit.</p>
            <img src={cashInIcon} alt="Cash In Icon" />
            <button type="button" onClick={close}>OK</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CashIn;
