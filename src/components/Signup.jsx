import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import image from "../assets/piggybank.png";
import { Link } from "react-router-dom";

// function FormInput({ type, context, placeholder }) {
//   return (
//     <div className="input-container">
//       <label>{context}</label>
//       <input type={type} placeholder={placeholder} />
//     </div>
//   );
// }

export const Signup = () => {
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



  useEffect(()=>{
     localStorage.setItem('items',JSON.stringify(inputValue))
  },[inputValue])
 

  return (
    <div className="sign-up-page">
      <div className="sign-up-logo">
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="sign-up-container">
        <div className="form-container">
          <form className="sign-up-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Create Account</h2>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                placeholder="juan"
                name="firstName"
                value={inputValue.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="dela cruz"
                name="lastName"
                value={inputValue.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="juandelacruz@gmail.com"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Mobile Number</label>
              <input
                type="number"
                placeholder="+63"
                name="mobile"
                value={inputValue.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                placeholder="***********"
                name="password"
                value={inputValue.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" >
              Sign up
            </button>
          </form>
          <div className="sign-up-text">
            <h3>Welcome to the newest version of WindBank Online</h3>
            <p>
              Deposits are insured by PDIC up to PHP 500,000.00 per depositor.
            </p>
            <p>
              {" "}
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
