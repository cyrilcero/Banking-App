import React from 'react';

const ChangePassModal = ({ show, onClose, children }) => {
 

  if (!show) {
    return null;
  }

  return (
    <div className="changePass-modal">
      <div className="changePass-modal-content">
        
        {children}
      </div>
    </div>
  );
};

export default ChangePassModal
