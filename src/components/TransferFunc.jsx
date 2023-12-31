import React, { useState } from "react";
import { Form } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess, toastError } from "../utils/toastify";
import image from '../assets/sendmoney.png';

function Inputs({ type, name, placeholder, text, value, onChange }) {
  return (
    <div className="transfer-form-inputs">
      <label>{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

const TransferFunc = ({ setter }) => {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
  const userAccounts = JSON.parse(localStorage.getItem("UserAccounts"));
  const localDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    hour12: false,
  });

  const [moneySended, setMoneySended] = useState(true);
  const [amountSufficient, setAmountSufficient] = useState(true);
  const [inputValue, setInputValue] = useState({
    sender: currentUser.email,
    amount: "",
    recipientEmail: "",
    accountName: "",
    date: localDate,
    transfer: moneySended,
    type: "Money Transfer",
  });

  const isExistingAccount = userAccounts.some((user) => {
    const [firstName, lastName] = inputValue.accountName
      .toLowerCase()
      .split(" ");
    return (
      user.email.toLowerCase() === inputValue.recipientEmail.toLowerCase() &&
      user.firstName.toLowerCase().includes(firstName) &&
      user.lastName.toLowerCase().includes(lastName) &&
      !user.isAdmin
    );
  });

  const handleChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (inputValue.recipientEmail === currentUser.email) {
      setMoneySended(false);
      toastError("Transfer Failed. You cannot send money to yourself.");
    } else if (!isExistingAccount) {
      setMoneySended(false);
      toastError("Transfer Failed. Account not existing");
    } else {
      const recipientAccount = userAccounts.find(
        (user) => user.email === inputValue.recipientEmail
      );
      if (recipientAccount) {
        const amount = parseFloat(inputValue.amount);
        const currentUserBalance = parseFloat(currentUser.accountBalance);

        const recipientBalance = parseFloat(recipientAccount.accountBalance);

        const senderIndex = userAccounts.findIndex(
          (user) => user.email === currentUser.email
        );
        const recipientIndex = userAccounts.findIndex(
          (user) => user.email === inputValue.recipientEmail
        );

        if (senderIndex !== -1 && recipientIndex !== -1) {
          const newCurrentUserBalance = currentUserBalance - amount;
          const newRecipientBalance = recipientBalance + amount;

          // Deduct the amount from the sender's account balance in userAccounts
          userAccounts[senderIndex].accountBalance =
            newCurrentUserBalance.toFixed(2);
          userAccounts[recipientIndex].accountBalance =
            newRecipientBalance.toFixed(2);

          localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));
        }

        if (currentUserBalance >= amount && amount > 0) {
          setAmountSufficient(true);

          toastSuccess("Transfer Successful.");

          setMoneySended(true);

          const newCurrentUserBalance = currentUserBalance - amount;

          const newRecipientBalance = recipientBalance + amount;

          currentUser.accountBalance = newCurrentUserBalance.toFixed(2);

          recipientAccount.accountBalance = newRecipientBalance.toFixed(2);

          const cashInHistory =
            JSON.parse(localStorage.getItem("CashInHistory")) || [];
          cashInHistory.push(inputValue);
          localStorage.setItem("CashInHistory", JSON.stringify(cashInHistory));

          localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
          localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));
          setter(userAccounts);
        } 

        else if (amount < 0) {
          toastError("Transfer Failed. Cannot send negative amount.");
          setAmountSufficient(false);
        }
        
        else {
          toastError("Transfer Failed. Insufficient Balance.");
          setAmountSufficient(false);
        }
      }
    }
    setInputValue({
      sender: currentUser.email,
      amount: "",
      recipientEmail: "",
      accountName: "",
      date: localDate,
      transfer: moneySended,
      type: "Money Transfer",
    });
  };

  return (
    <>
      <Form className="transfer-form" onSubmit={submitHandle}>
        <img src={image} alt="sendmoney-img" className="sendmoney-img" /> 
        <Inputs
          type="number"
          name="amount"
          placeholder="0.00"
          text="Amount"
          value={inputValue.amount}
          inputMode="decimal"
          step="0.01"
          onChange={handleChange}
        />
        <Inputs
          type="email"
          name="recipientEmail"
          placeholder="juandelacruz@gmail.com"
          text="Recipient Email"
          value={inputValue.recipientEmail}
          onChange={handleChange}
        />
        <Inputs
          type="text"
          name="accountName"
          placeholder="juan dela cruz"
          text="Recipient Name"
          value={inputValue.accountName}
          onChange={handleChange}
        />
        <button className="transfer-btn">Send Money</button>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default TransferFunc;
