import { useState, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png"
import login_monitor from "../assets/loginpage_monitor.png"
import login_bank from "../assets/loginpage_bank.png"

function LogInForm() {
  const [loginData, setLoginData] = useState({username: "", password: ""})
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  function handleInputChange(e) {
    setLoginData((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault()
    const listOfUsers = JSON.parse(localStorage.getItem("UserAccounts"))
    const userExists = listOfUsers.find(user => user.email === loginData.username && user.password === loginData.password)

    if (userExists) {
      localStorage.setItem("CurrentUser", JSON.stringify(userExists))
      if (userExists.isAdmin === true) {
        navigate("/admin")
        setLoginData("")
      } else {
        navigate(`/overview/${userExists.accountID}`)
        setLoginData("")
      }
    } else {
      setErrorMessage("Invalid credentials")
      // alert("Invalid credentials")
      setLoginData({username: "", password: ""})
    }
  }

  useEffect(() => {
    console.log("LOGIN DATA", loginData)
  }, [loginData])

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-form-title">Login</h1>
      <label htmlFor="username" className="login-form-label">Username</label>
      <input type="text"
        placeholder="juandelacruz@gmail.com"
        name="username"
        className="login-form-input"
        value={loginData.username}
        onChange={handleInputChange} />
      <label htmlFor="password" className="login-form-label">Password</label>
      <input type="password"
        placeholder="Enter Password"
        name="password"
        className="login-form-input"
        value={loginData.password}
        onChange={handleInputChange} />
      <button type="submit" className="login-form-btn">Log In</button>
      {errorMessage && <p className="login-form-alert">{errorMessage}</p>}
    </form>
  );
}

function LogInPage() {
  return (
    <div className="login-page">
      <LoginPageNavBar />
      <div className="login-page-container">
        <SideFormContent />
        <LogInForm />
        {/* <LoginForm /> */}
      </div>
      {/* <img src={login_monitor} alt="login_monitor" className="login-monitor"/> */}
      {/* <img src={login_bank} alt="login_monitor" className="login-bank"/> */}
    </div>
  )
}

function LoginPageNavBar() {
  return (
    <nav className="login-page-nav-bar">
      <img src={logo} alt="bank_logo" className="login-page-nav-bar-logo" />
    </nav>
  )

}

function SideFormContent() {
  return (
    <>
      <div className="side-form-content">
        <h1 className="side-form-title">Welcome to the newest version of WindBank Online</h1>
        <p className="side-form-text">Deposits are insured by PDIC up to PHP 500,000.00 per depositor.</p>
        <p className="side-form-text">WindBank is supervised by the Bangko Sentral ng Pilipinas (+632 8708-7087 | consumeraffairs@bsp.gov.ph.)</p>
      </div>
    </>
  )
}

export default LogInPage;
