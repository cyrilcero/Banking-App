import React, { useState } from "react";
import { Form } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess, toastError } from "../utils/toastify";

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

const TransferFunc = () => {
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
    email: "",
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
      user.email.toLowerCase() === inputValue.email.toLowerCase() &&
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

    if (inputValue.email.toLowerCase() === currentUser.email.toLowerCase()) {
      setMoneySended(false);
      toastError("Transfer Failed. You cannot send money to yourself.");
    } else if (!isExistingAccount) {
      toastError("Transfer Failed. Account not existing.");
      setMoneySended(false);
    } else {
      const recipientAccount = userAccounts.find(
        (user) => user.email === inputValue.email
      );

      toastSuccess("Transfer Successful.");

      if (recipientAccount) {
        const amount = parseFloat(inputValue.amount);
        const currentUserBalance = parseFloat(currentUser.accountBalance);
        const recipientBalance = parseFloat(recipientAccount.accountBalance);

        if (currentUserBalance >= amount && amount > 0) {
          setAmountSufficient(true);
          const newCurrentUserBalance = currentUserBalance - amount;
          const newRecipientBalance = recipientBalance + amount;
          
          const userAccountNewBalance = userAccounts.find((user)=>user.email === currentUser);
          userAccountNewBalance.accountBalance = newCurrentUserBalance;
          currentUser.accountBalance = newCurrentUserBalance;
          recipientAccount.accountBalance = newRecipientBalance;

          localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
          localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));

          const cashInHistory =
            JSON.parse(localStorage.getItem("CashInHistory")) || [];
          cashInHistory.push(inputValue);
          localStorage.setItem("CashInHistory", JSON.stringify(cashInHistory));

          toastSuccess("Transfer Successful.");
          setMoneySended(true);
        } else {
          toastError("Insufficient Balance.");
          setAmountSufficient(false);
        }
      }
    }
    setInputValue({
      amount: "",
      email: "",
      accountName: "",
    });
  };

  return (
    <>
      <Form className="transfer-form" onSubmit={submitHandle}>
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
          name="email"
          placeholder="juandelacruz@gmail.com"
          text="Email"
          value={inputValue.email}
          onChange={handleChange}
        />
        <Inputs
          type="text"
          name="accountName"
          placeholder="Juan Dela Cruz"
          text="Account Name"
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
