import { Link, Form, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toastSuccess, toastError } from "../utils/toastify";

const initialUserData = [
  {
    firstName: "admin",
    lastName: "",
    email: "admin@email.com",
    password: "admin00",
    accountBalance: 0,
    accountID: "admin",
    isAdmin: true,
  },
];

function filterInput(input) {
  let filtered = "";

  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      char === ""
    ) {
      filtered += char;
    }
  }

  return filtered;
}

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
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountBalance: 0,
    accountID: Date.now()
      .toString()
      .replace(/^\d{3}/, "00"),
    isAdmin: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNameChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: filterInput(e.target.value),
    }));
  };

  const handlePasswordChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.value.length > 5) {
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
  }, []);

  function submitHandle(e) {
    e.preventDefault();

    const newUser = { ...inputValue };
    const userAccounts = JSON.parse(localStorage.getItem("UserAccounts"));
    const isEmailTaken = userAccounts.find(
      (user) => user.email === newUser.email
    );

    if (newUser.password.length < 6) {
      return toastError("Password is less than 6 characters.");
    } else if (isEmailTaken) {
      setErrorMessage(`Email ${inputValue.email}
      is already taken. Please choose a different email.`);
      toastError(`Email ${inputValue.email}
      is already taken. Please choose a different email.`);
      setInputValue({
        firstName: "",
        lastName: "",
        email: "",
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
      // localStorage.setItem("CurrentUser", JSON.stringify(newUser));

      setInputValue({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        accountBalance: 0,
        isAdmin: false,
        accountID: "",
      });

      toastSuccess(
        `Created account for ${newUser.firstName} ${newUser.lastName}`
      );
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
          onChange={handleNameChange}
        />
        <Inputs
          text="Last Name"
          type="text"
          placeholder="dela cruz"
          name="lastName"
          value={inputValue.lastName}
          onChange={handleNameChange}
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
          text="Password"
          type="password"
          placeholder="***********"
          name="password"
          value={inputValue.password}
          onChange={handlePasswordChange}
        />
        <Link to={"/login"}>
          <span className="redirect-link">
            Already have an account? Login Here
          </span>
        </Link>
        <button type="submit">Sign up</button>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </Form>
    </>
  );
}
