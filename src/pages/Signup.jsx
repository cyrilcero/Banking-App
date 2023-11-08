import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import image from "../assets/piggybank.png";
import "../App.css";
import SignUpForm from "../components/SignUpForm";

function Signup() {
  return (
    <div className="sign-up-page">
      <Link className="login-page-nav-bar" to={"/"}>
        <img src={logo} alt="bank_logo" className="login-page-nav-bar-logo" />
      </Link>
      <div className="sign-up-container">
        <div className="signup-form-container">
          <SignUpForm />
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
}

export default Signup;
