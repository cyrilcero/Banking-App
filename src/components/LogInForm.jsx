import React, { useState, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png"
import login_monitor from "../assets/loginpage_monitor.png"
import login_bank from "../assets/loginpage_bank.png"



const userLoginData = {
  username: "",
  password: "",
  loggedIn: false
}

const initialUsers = [
  {
    username: "admin",
    password: "pass",
    loggedIn: false
  },
  {
    username: "user1",
    password: "pass1",
    loggedIn: false
  },
  {
    username: "user2",
    password: "pass2",
    loggedIn: false
  }
]

function LogInForm() {
  const [loginData, setLoginData] = useState(userLoginData)
  const [loggedInUser, setLoggedInUser] = useState(userLoginData)
  const navigate = useNavigate()

  function handleChange(e) {
    setLoginData((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  };

  function handleSubmit() {
    // e.preventDefault()
    const userExists = initialUsers.some(user => user.username === loginData.username && user.password === loginData.password)

    if (userExists) {
      setLoginData(loginData.loggedIn = true)
      console.log("logInData", loginData);
      setLoggedInUser(
        loggedInUser.username = loginData.username,
        loggedInUser.password = loginData.password,
        loggedInUser.loggedIn = loginData.loggedIn,
      )
      console.log("logInData", loginData);
      console.log("loggedInUserData", loggedInUser);
      // navigate("/overview")
    } else {
      console.log("not logged in", loginData);
    }

    // setLoggedInUser(state => {
    //   const existingUser = initialUsers.find(item => item.username === loginData.username && item.password === loginData.password)
    //   console.log("asdasd", existingUser)
    //   return (existingUser || state)
    // })

  };

  useEffect(() => {
    console.log("LOGIN DATA", loginData)
    // console.log("LOGGEDINUSER", loggedInUser)
  }, [loginData, loggedInUser])

  return (
    <Form className="login-form"
      onSubmit={handleSubmit}
      action="/overview"
    >
      <h1 className="login-form-title">Login</h1>

      <label htmlFor="username" className="login-form-label">Username</label>
      <input type="text"
        placeholder="Enter Username"
        name="username"
        className="login-form-input"
        // onChange={(e) => setLoginData(...loginData, loginData.username = e.target.value)} />
        onChange={handleChange} />

      <label htmlFor="password" className="login-form-label">Password</label>
      <input type="password"
        placeholder="Enter Password"
        name="password"
        className="login-form-input"
        // onChange={(e) => setLoginData(...loginData, loginData.password = e.target.value)} 
        onChange={handleChange} />

      <button type="submit" className="login-form-btn">Log In</button>
      {!loggedInUser.loggedIn && <p className="login-form-alert">Please enter Username and Password</p>}
    </Form>
  );
}

function LogInPage() {
  return (
    <div className="login-page">
      <LoginPageNavBar />
      <div className="login-page-container">
        <SideFormContent />
        <LogInForm />
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

<<<<<<< HEAD
export default LogInPage;
=======


function LogInForm() {
  return (
    <form className="login-form">
      <h1 className="login-form-title">Login</h1>

      <label htmlFor="username" className="login-form-label">Username</label>
      <input type="text"
        placeholder="Enter Username"
        name="username"
        className="login-form-input"
        autoComplete={false}
        // onChange={(e) => setLoginData(...loginData, loginData.username = e.target.value)} />
        onChange={handleChange} />

      <label htmlFor="password" className="login-form-label">Password</label>
      <input type="password"
        placeholder="Enter Password"
        name="password"
        className="login-form-input"
        autoComplete={false}
        // onChange={(e) => setLoginData(...loginData, loginData.password = e.target.value)} 
        onChange={handleChange} />

      <button type="submit" className="login-form-btn">Log In</button>
    </Form>
  );
}



export default LogInPage;
>>>>>>> 10edb33d868eb8426d35f68b3e5933d89b284643
