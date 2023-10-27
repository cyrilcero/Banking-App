import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import image from "../assets/piggybank.png";
import { Form, Link } from "react-router-dom";
import "../App.css";
import { SignUpForm } from "./SignUpForm";


export const Signup = () => {
  return (
    <div className="sign-up-page">
      <div className="sign-up-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="sign-up-container">
        <div className="signup-form-container">
          <SignUpForm/>
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
