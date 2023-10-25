import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import image from "../assets/piggybank.png";
import { Form, Link } from "react-router-dom";
import "../App.css";

function Inputs({ type, name, placeholder, text, value, onChange }) {
  return(
    <div className="signup-input-container">
    <label>{text}</label>
    <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange}/>
  </div>
  )
}

export const Signup = () => {
  const storage = [];

  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputValue((prevInput) => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    storage.push(inputValue);
    console.log(inputValue);
  }, [inputValue]);

  function submitHandle(e) {
   e.preventDefault()
    localStorage.setItem("items", JSON.stringify(storage));
  }

  return (
    <div className="sign-up-page">
      <div className="sign-up-logo">
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="sign-up-container">
        <div className="signup-form-container">
          <Form
            action="/dashboard"
            method="GET"
            className="sign-up-form"
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
            <button type="submit" onSubmit={submitHandle}>
              Sign up
            </button>
          </Form>
          <div className="sign-up-text">
            <h3>Welcome to the newest version of WindBank Online</h3>
            <p>
              Deposits are insured by PDIC up to PHP 500,000.00 per depositor.
            </p>
            <p>
              WindBank is supervised by the Bangko Sentral ng Pilipinas (+632
              8708-7087 | consumeraffairs@bsp.gov.ph).
            </p>
            <img src={image} alt="piggybank" className="sign-up-img" />
          </div>
        </div>
      </div>
    </div>
  );
};
