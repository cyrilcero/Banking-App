import React from 'react'
import { Form } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../App.css";

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


const initialUserData = [
    {
        accountBalance: "0.00",
        accountID: Date.getTime(),
        firstName: "user",
        lastName: "test",
        email: "user@gmail.com",
        mobile: "09523151212",
        password: "pass",
    }
]

export const SignUpForm = () => {

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
       
         localStorage.setItem("items", JSON.stringify(inputValue));
      };
    
      useEffect(() => {
        localStorage.setItem("initial", JSON.stringify(initialUserData))
     const userEmail = JSON.parse(localStorage.getItem("items"))
        const userData = initialUserData.map(items=>items.email) 
        inputValue.includes()
      }, [inputValue]);
    
      function submitHandle(e) {
        e.preventDefault();
      }

  return (
    <>
        <Form action="/dashboard" method="GET" className="sign-up-form">
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
    </>
  )
}
