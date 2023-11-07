import React, { useState } from 'react';
import ChangePassModal from "../components/changePassModal";
import { toastInfo } from "../utils/toastify";


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
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
      toastInfo("Password changed successfully"); 


      setTimeout(function() {
        closeChangePassword();
      }, 6000); 
    
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


  return (
    <section className='settings'>
      <div class="changePass-wrapper">
      <h1>Password and Security</h1>
      <button onClick={openChangePassword}>Change your password</button>

      <ChangePassModal show={showChangePassword} onClose={closeChangePassword}>
        <h3>Change Password</h3>
        <p>Your password must be at least 6 characters.</p>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div className="signup-input-container">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="***********"
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>New Password</label>
            <input
              type="password"
              placeholder="***********"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="***********"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button onClick={handleChangePassword}>Change Password</button>
        <button onClick={closeChangePassword}>Close</button>
        {passwordChangeError && <p className="errorMessage">{passwordChangeError}</p>}
      </ChangePassModal>
      </div>
    </section>
  );
}

export default Settings;
