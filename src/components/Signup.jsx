import React from "react";
import logo from "../assets/logo.png";
import image from "../assets/piggybank.png";

function FormInput({ type, context, htmlFor, placeholder }) {
  return (
    <div className="input-container">
      <label htmlFor={htmlFor}>{context}</label>
      <input type={type} placeholder={placeholder}/>
    </div>
  );
}

export const Signup = () => {
  return (
    <div className="sign-up-page">
      <div className="sign-up-logo"><img src={logo} alt="logo" /></div>
      <div className="sign-up-container">
   
        <div className="form-container">
          <form action="" method="get" className="sign-up-form">
            <h2>Create Account</h2>
            <FormInput type="text" context="First Name" htmlFor="firstname"  placeholder="juan"/>
            <FormInput type="text" context="Last Name" htmlFor="lastname" placeholder="dela cruz" />
            <FormInput type="email" context="Email" htmlFor="email" placeholder="juandelacruz@gmail.com"/>
            <FormInput type="number" context="Mobile Number" htmlFor="contact" placeholder="+63"/>
            <FormInput type="password" context="Password" htmlFor="password" placeholder="**************"/>
            <button>Sign up</button>
          </form>
          <div className="sign-up-text">
            <h3>Welcome to the newest version of WindBank Online</h3>
            <p>
              Deposits are insured by PDIC up to PHP 500,000.00 per depositor.
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
