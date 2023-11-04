import React, { useState } from 'react';
import ChangePassModal from "../components/changePassModal";
import { Form } from "react-router-dom";

function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  function openChangePassword() {
    setShowChangePassword(true);
  }

  function closeChangePassword() {
    setShowChangePassword(false);
    setPasswordChangeError("");
  }

  function handleChangePassword() {
 
    if (currentPasswordIsValid() && newPasswordIsValid() && newPassword === confirmPassword) {
      const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

      currentUser.password = newPassword;

      localStorage.setItem('CurrentUser', JSON.stringify(currentUser));

      const userAccounts = JSON.parse(localStorage.getItem('UserAccounts'));
      const updatedUserAccounts = userAccounts.map(user => {
        if (user.email === currentUser.email) {
          return {
            ...user,
            password: newPassword
          };
        }
        return user;
      });


      localStorage.setItem('UserAccounts', JSON.stringify(updatedUserAccounts));

      setPasswordChangeError("Password changed successfully");
    } else {
      setPasswordChangeError("Password change failed. Please check your input.");
    }
  }

  function currentPasswordIsValid() {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    return currentPassword === currentUser.password;
  }

  function newPasswordIsValid() {
    return newPassword.length >= 6;
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

  return (
    <section className='settings'>
      <h1>Password and Security</h1>
      <button onClick={openChangePassword}>Change your password</button>

      <ChangePassModal show={showChangePassword} onClose={closeChangePassword}>
        <h3>Change Password</h3>
        <p>Your password must be at least 6 characters.</p>
        <Form action="/dashboard" method="GET" style={{display: 'flex', alignItems: 'center', flexDirection:'column' }}>
          <Inputs text="Current Password" type="password" placeholder="***********" name="currentPassword" value={currentPassword} onChange={handleChange} />
          <Inputs text="New Password" type="password" placeholder="***********" name="newPassword" value={newPassword} onChange={handleChange} />
          <Inputs text="Confirm Password" type="password" placeholder="***********" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
        </Form>
        <button onClick={handleChangePassword}>Change Password</button>
        {passwordChangeError && <p className="errorMessage">{passwordChangeError}</p>}
      </ChangePassModal>
    </section>
  );
}

export default Settings;
