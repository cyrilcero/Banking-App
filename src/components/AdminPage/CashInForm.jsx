import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import Select from "react-select";
import getLocalStorage from "../../utils/getLocalstorage";
import { flushSync } from "react-dom";

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
  //useStates
  const [inputValue, setInputValue] = useState({
    lastTopUp: "",
    firstName: "",
    lastName: "",
    email: "",
    accountBalance: "",
    accountID: "",
  });
  const [existingAccount, setExistingAccount] = useState(true);
  const [negativeAmount, setNegativeAmount] = useState(false);
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const dropDownOverAllSelection = getLocalStorage("UserAccounts");
  const dropDownClientSelection = dropDownOverAllSelection.filter(
    (items) => items.isAdmin === false
  );
  const dropDownItems = dropDownClientSelection.map((items) => ({
    value: [
      items.accountID,
      items.email,
      items.firstName,
      items.lastName,
      items.accountBalance,
    ],
    label: `${items.firstName} ${items.lastName} - ${items.email} `,
  }));
  //toggle
  const handleWithdrawalToggle = () => {
    setIsWithdrawal(!isWithdrawal);
  };

  //onChange
  const handleChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setExistingAccount(true);
    setNegativeAmount(false);
  };

  function handleSelect(inputValue) {
    setInputValue((prev) => ({
      ...prev,
      accountID: inputValue.value[0],
      email: inputValue.value[1],
      firstName: inputValue.value[2],
      lastName: inputValue.value[3],
      accountBalance: inputValue.value[4],
    }));
  }

  //useEffect
  useEffect(() => {
    const existingUserAccounts = JSON.parse(
      localStorage.getItem("UserAccounts")
    );

    if (!existingUserAccounts) {
      localStorage.setItem("UserAccounts", JSON.stringify([]));
    }
    console.log(inputValue);
  }, [inputValue]);

  //onclick
  function validateInput(inputValue) {
    const { accountBalance } = inputValue;
    if (Number.isNaN(accountBalance) || parseFloat(accountBalance) < 0) {
      setNegativeAmount(true);
      return false;
    }
    return true;
  }

  //onSubmit form
  function submitHandle(e) {
    e.preventDefault();

    if (!validateInput(inputValue)) {
      return;
    }

    const userAccount = { ...inputValue };
    const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
    const userAccounts = JSON.parse(localStorage.getItem("UserAccounts"));
    const isExistingAccount = userAccounts.find(
      (user) =>
        user.email.toLowerCase() === userAccount.email.toLowerCase() &&
        user.firstName.toLowerCase() === userAccount.firstName.toLowerCase() &&
        user.lastName.toLowerCase() === userAccount.lastName.toLowerCase() &&
        user.isAdmin === false
    );

    if (isExistingAccount) {
      setExistingAccount(true);
      const focusedUser = userAccounts.find(
        (user) => user.email === userAccount.email
      );

      if (focusedUser) {
        const existingBalance = parseFloat(focusedUser.accountBalance);
        const inputBalance = parseFloat(userAccount.accountBalance);
        const localDate = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Manila",
          hour12: false,
        });

        if (isNaN(inputBalance) || inputBalance < 0) {
          setNegativeAmount(true);
          console.log("Amount cannot be negative.");
          return;
        }

        if (isWithdrawal) {
          if (existingBalance < inputBalance) {
            console.log("Insufficient balance for withdrawal.");
            return;
          }

          focusedUser.accountBalance = (existingBalance - inputBalance).toFixed(
            2
          );
        } else {
          focusedUser.accountBalance = (existingBalance + inputBalance).toFixed(
            2
          );
        }

        const type = !isWithdrawal ? "Cash In" : "Withdrawal";

        const transaction = {
          userId: inputValue.email,
          date: localDate,
          amount: inputValue.accountBalance,
          deposit: isWithdrawal,
          type: type,
        };

        const cashInHistory =
          JSON.parse(localStorage.getItem("CashInHistory")) || [];
        cashInHistory.push(transaction);
        localStorage.setItem("CashInHistory", JSON.stringify(cashInHistory));
      }

      localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));

      // Update the `CurrentUser` if the user is not an admin
      if (!currentUser.isAdmin) {
        currentUser.accountBalance = userAccount.accountBalance;
        localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
      }

      console.log("Account exists. Account balance has been updated.");
    } else {
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

      <label htmlFor="accountSelector">Select Account</label>
      <Select
        className="select-input"
        onChange={handleSelect}
        options={dropDownItems}
        isDisabled={false}
        isLoading={false}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="accountID"
      />
      <Inputs
        text="Amount"
        type="text"
        placeholder="0.00"
        name="accountBalance"
        value={inputValue.accountBalance}
        onChange={handleChange}
      />
      {negativeAmount && <span>*Amount must be a positive number.</span>}
      <button type="submit">
        <h3>{isWithdrawal ? "Withdraw" : "Top-Up"}</h3>
      </button>
      {!existingAccount && (
        <span>*Account does not exist. Create a new account.</span>
      )}
      <h5 onClick={handleWithdrawalToggle}>
        {isWithdrawal ? "Cash-in account?" : "Withdraw funds instead?"}
      </h5>
    </Form>
  );
}

export default CashInForm;
