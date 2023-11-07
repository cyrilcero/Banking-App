import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { toastSuccess, toastError } from "../utils/toastify";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

const initialUserData = [
  {
    firstName: "admin",
    lastName: "",
    email: "admin@email.com",
    mobile: "",
    password: "admin00",
    accountBalance: 0,
    accountID: "admin",
    isAdmin: true,
  },
];

function Inputs({ type, name, placeholder, text, value, onChange }) {
  return (
    <div className="signup-input-container">
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

export default function AdminSignUpForm() {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    accountBalance: 0,
    isAdmin: false,
    accountID: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (inputValue.password.length >= 6) {
      setErrorMessage("");
    } else {
      setErrorMessage("Password is less than 6 characters");
    }
  };

  useEffect(() => {
    const existingUserAccounts = JSON.parse(
      localStorage.getItem("UserAccounts")
    );

    if (!existingUserAccounts) {
      localStorage.setItem("UserAccounts", JSON.stringify(initialUserData));
    }
  }, [inputValue]);

  function submitHandle(e) {
    e.preventDefault();

    const newUser = { ...inputValue };
    const userAccounts = JSON.parse(localStorage.getItem("UserAccounts"));
    const isEmailTaken = userAccounts.find(
      (user) => user.email === newUser.email
    );

    if (isEmailTaken) {
      toastError(`Email ${inputValue.email}
      is already taken. Please choose a different email.`);
      setInputValue({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        accountBalance: 0,
        isAdmin: false,
        accountID: "",
      });
    } else {
      const accountID = Date.now()
        .toString()
        .replace(/^\d{3}/, "00");

      newUser.accountID = accountID;
      userAccounts.push(newUser);
      localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));

      const history = getLocalStorage("CashInHistory") || [];
      const localDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        hour12: false,
      });
      const newHistory = {
        amount: inputValue.accountBalance,
        date: localDate,
        deposit: true,
        type: "Cash In",
        userId: inputValue.email,
      };
      history.push(newHistory)
      setLocalStorage("CashInHistory", history)
      toastSuccess(
        `Created account for ${newUser.firstName} ${newUser.lastName}`
      );

      setInputValue({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        accountBalance: 0,
        isAdmin: false,
        accountID: "",
      });
    }
  }

  return (
    <>
      <Form className="sign-up-form" onSubmit={submitHandle}>
        <h2>Create Account</h2>
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
          text="Mobile Number"
          type="number"
          placeholder="+63"
          name="mobile"
          value={inputValue.mobile}
          onChange={handleChange}
        />
        <Inputs
          text="Password"
          type="password"
          placeholder="***********"
          name="password"
          value={inputValue.password}
          onChange={handlePasswordChange}
        />
        <Inputs
          text="Initial Balance"
          type="text"
          placeholder="0.00"
          name="accountBalance"
          value={inputValue.accountBalance}
          onChange={handleChange}
        />
        <button type="submit">Sign up</button>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </Form>
    </>
  );
}
