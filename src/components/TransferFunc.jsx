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

  const submitHandle = () => {
    if (!isExistingAccount) {
      setMoneySended(false);
      toastError('Transfer Failed.');
    } else {
      const recipientAccount = userAccounts.find(
        (user) => user.email === inputValue.email
      );

      if (recipientAccount) {
        const amount = parseFloat(inputValue.amount);
        const currentUserBalance = parseFloat(currentUser.accountBalance);
        const recipientBalance = parseFloat(recipientAccount.accountBalance);

        if (currentUserBalance >= amount && amount > 0) {
          setAmountSufficient(true);
          const newCurrentUserBalance = currentUserBalance - amount;
          const newRecipientBalance = recipientBalance + amount;

          currentUser.accountBalance = newCurrentUserBalance.toFixed(2);
          recipientAccount.accountBalance = newRecipientBalance.toFixed(2);

          localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
          localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));

          const cashInHistory =
            JSON.parse(localStorage.getItem("CashInHistory")) || [];
          cashInHistory.push(inputValue);
          localStorage.setItem("CashInHistory", JSON.stringify(cashInHistory));

          toastSuccess(
           "Transfer Successful."
          );

          setMoneySended(true);
        } else {
          toastError('Transfer Failed.');
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
        placeholder="Amount"
        text="Amount"
        value={inputValue.amount}
        onChange={handleChange}
      />
      <Inputs
        type="email"
        name="email"
        placeholder="Email"
        text="Email"
        value={inputValue.email}
        onChange={handleChange}
      />
      <Inputs
        type="text"
        name="accountName"
        placeholder="Account Name"
        text="Account Name"
        value={inputValue.accountName}
        onChange={handleChange}
      />
      <button className="transfer-btn">Send Money</button>
      {!moneySended ? <p>*Account not existing</p> : null}
      {!amountSufficient ? <p>*Insufficient balance</p> : null}
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
