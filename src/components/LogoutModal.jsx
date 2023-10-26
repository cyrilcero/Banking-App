import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ show, onClose, children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('CurrentUser');
    navigate('/');
  }

  if (!show) {
    return null;
  }

  return (
    <div className="logout-modal">
      <div className="logout-modal-content">
        
        {children}
    
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default LogoutModal
