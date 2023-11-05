import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastSuccess from "../utils/toastSuccess";
import toastError from "../utils/toastError";

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

export default function SignUpForm() {
  const navigate = useNavigate();
  const [emailTaken, setEmailTaken] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    accountBalance: 0,
    accountID: Date.now()
      .toString()
      .replace(/^\d{3}/, "00"),
    isAdmin: false,
  });

  const handleChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setEmailTaken(false);
  };

  useEffect(() => {
    const existingUserAccounts = JSON.parse(
      localStorage.getItem("UserAccounts")
    );

    if (!existingUserAccounts) {
      localStorage.setItem("UserAccounts", JSON.stringify(initialUserData));
    }
  }, []);

  function submitHandle(e) {
    e.preventDefault();

    const newUser = { ...inputValue };
    const userAccounts = JSON.parse(localStorage.getItem("UserAccounts"));
    const isEmailTaken = userAccounts.find(
      (user) => user.email === newUser.email
    );

    if (isEmailTaken) {
      setEmailTaken(true);
      console.log("Email is already taken. Please choose a different email.");
      toastError("Email Taken.");
      setInputValue({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
      });
    } else {
      const accountID = Date.now()
        .toString()
        .replace(/^\d{3}/, "00");

      newUser.accountID = accountID;
      userAccounts.push(newUser);
      localStorage.setItem("UserAccounts", JSON.stringify(userAccounts));
      // localStorage.setItem("CurrentUser", JSON.stringify(newUser));

      setInputValue({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
      });
      
      toastSuccess('Created Account Successfully.');
      navigate("/login");
    }
  }

  return (
    <>
      <Form
        action="/dashboard"
        method="GET"
        className="sign-up-form"
        onSubmit={submitHandle}
      >
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
          onChange={handleChange}
        />
        <button type="submit">Sign up</button>
        {emailTaken && (
          <p className="errorMessage">
            *Email is already taken. Please choose a different email.
          </p>
        )}
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
}
