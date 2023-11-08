import React, { useState } from 'react';
import ChangePassModal from "../components/changePassModal";
import { toastInfo } from "../utils/toastify";


function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });


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
      setPasswordChangeError('');
      toastInfo("Password changed successfully"); 
      setTimeout(function() {
        closeChangePassword();
      }, 6000); 
    
    }else if(newPassword !== confirmPassword ){
      setPasswordChangeError("New password does not match.");
    }else  if (currentPassword.length === 0 || newPassword.length === 0 || confirmPassword.length === 0) {
      setPasswordChangeError("Please complete the fields.");
    } else if(currentPassword !== currentPasswordIsValid() ){
      setPasswordChangeError("Your current password is incorrect.");
    }else {
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

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };
  return (
    <section className='settings'>
      <ChangePassModal show={showChangePassword} onClose={closeChangePassword}>
        <h3>Change Password</h3>
        <p>Your password must be at least 6 characters.</p>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div className="signup-input-container">
            <label>Current Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisibility.currentPassword ? 'text' : 'password'}
                placeholder="***********"
                name="currentPassword"
                value={currentPassword}
                onChange={handleChange}
                required
              />
              <i
                className={`fa ${passwordVisibility.currentPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={() => togglePasswordVisibility('currentPassword')}
              ></i>
            </div>
          </div>
          <div className="signup-input-container">
            <label>New Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisibility.newPassword ? 'text' : 'password'}
                placeholder="***********"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                required
              />
              <i
                className={`fa ${passwordVisibility.newPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={() => togglePasswordVisibility('newPassword')}
              ></i>
            </div>
          </div>
          <div className="signup-input-container">
            <label>Confirm Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                placeholder="***********"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
              <i
                className={`fa ${passwordVisibility.confirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={() => togglePasswordVisibility('confirmPassword')}
              ></i>
            </div>
          </div>
        </div>
        <button onClick={handleChangePassword}>Change Password</button>
        <button onClick={closeChangePassword}>Close</button>
        {passwordChangeError && <p className="errorMessage-Modal">{passwordChangeError}</p>}
      </ChangePassModal>

      <div className="changePass-wrapper">
        <h1>Password and Security</h1>
        <button onClick={openChangePassword}>Change your password</button>
      </div>
    </section>
  );
}

export default Settings;
