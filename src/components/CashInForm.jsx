import React, { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';

function Inputs({ type, name, placeholder, text, value, onChange }) {
  return (
    <div className="cashin-input-container">
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

function CashInForm() {
  const [inputValue, setInputValue] = useState({
    lastTopUp: "",
    firstName: "",
    lastName: "",
    email: "",
    accountBalance: "",
  });
  const [existingAccount, setExistingAccount] = useState(true);
  const [negativeAmount, setNegativeAmount] = useState(false);
  const [isWithdrawal, setIsWithdrawal] = useState(false);

  const handleWithdrawalToggle = () => {
    setIsWithdrawal(!isWithdrawal);
  };

  const handleChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setExistingAccount(true);
    setNegativeAmount(false);
  };

  useEffect(() => { 
    const existingUserAccounts = JSON.parse(localStorage.getItem("UserAccounts"));

    if (!existingUserAccounts) {
      localStorage.setItem("UserAccounts", JSON.stringify([]));
    }
  }, []);

  function validateInput(inputValue) {
    const { accountBalance } = inputValue;
    if (Number.isNaN(accountBalance) || parseFloat(accountBalance) < 0) {
      setNegativeAmount(true);
      return false;
    }
    return true;
  }

  function submitHandle(e) {
    e.preventDefault();

    if (!validateInput(inputValue)) {
      return;
    }

    const userAccount = { ...inputValue };
    const userAccounts = JSON.parse(localStorage.getItem("UserAccounts"));
    const isExistingAccount = userAccounts.find(
      (user) => user.email.toLowerCase() === userAccount.email.toLowerCase() && 
        user.firstName.toLowerCase() === userAccount.firstName.toLowerCase() && 
        user.lastName.toLowerCase() === userAccount.lastName.toLowerCase()
    );

    if (isExistingAccount) {
      setExistingAccount(true);
      const focusedUser = userAccounts.find((user) => user.email === userAccount.email);

      if (focusedUser) {
        const existingBalance = parseFloat(focusedUser.accountBalance);
        const inputBalance = parseFloat(userAccount.accountBalance);
        const localDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila", hour12: false });

        if (isNaN(inputBalance) || inputBalance < 0) {
          setNegativeAmount(true);

          console.log("Amount cannot be negative.");
          return;
        }

        if (isWithdrawal) {
          focusedUser.accountBalance = (existingBalance - inputBalance).toFixed(2);
          focusedUser.lastWithdrawal = localDate;
        } 
        
        else {
          focusedUser.accountBalance = (existingBalance + inputBalance).toFixed(2);
          focusedUser.lastTopUp = localDate;
        }          

        localStorage.setItem("FocusedUser", JSON.stringify(focusedUser));
      }

      localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));
      console.log("Account exists. Account balance has been updated.");
    } 
    
    else {
      setExistingAccount(false);
      console.log("Account does not exist. Create a new account.");
    }

    setInputValue({
      lastTopUp: "",
      firstName: "",
      lastName: "",
      email: "",
      accountBalance: "",
    });
  }

  return (
    <Form
      action="/dashboard"
      method="GET"
      className="cashin-form"
      onSubmit={submitHandle}
    >
      <h2>{isWithdrawal ? "Withdraw" : "Deposit"}</h2>
      <Inputs
        text="Date Today"
        type="text"
        placeholder="mm/dd/yyyy"
        name="lastTopUp"
        value={inputValue.lastTopUp}
        onChange={handleChange}
      />
      <Inputs
        text="First Name"
        type="text"
        placeholder="juan"
        name="firstName"
        value={inputValue.firstName}
        onChange={handleChange}
      />
      <Inputs
        text="Last Name"
        type="text"
        placeholder="dela cruz"
        name="lastName"
        value={inputValue.lastName}
        onChange={handleChange}
      />
      <Inputs
        text="Email"
        type="email"
        placeholder="juandelacruz@gmail.com"
        name="email"
        value={inputValue.email}
        onChange={handleChange}
      />
      <Inputs
        text="Amount"
        type="text"
        placeholder="0.00"
        name="accountBalance"
        value={inputValue.accountBalance}
        onChange={handleChange}
      />
      {negativeAmount && (
        <span>
          *Amount must be a positive number.
        </span>
      )}
      <button type="submit">
        <h3>{isWithdrawal ? "Withdraw" : "Top-Up"}</h3>
      </button>
      {!existingAccount && (
        <span>
          *Account does not exist. Create a new account.
        </span>
      )}
      <h5 onClick={handleWithdrawalToggle}>
        {isWithdrawal ? "Cash-in account?" : "Withdraw funds instead?"}
      </h5>
    </Form>
  );
}

export default CashInForm;
