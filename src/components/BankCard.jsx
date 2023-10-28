import React from 'react';
import cardChip from "../assets/cardChip.png";
import cardIndicator from "../assets/cardIndicator.png";
import cardMastercard from "../assets/cardMastercard.png";

function BankCard() {
  return (
    <div className='bank-card'>
      <h3 className='bank-name'>windbank</h3>
      <img src={cardMastercard} alt="mastercard_logo" className="mastercard_logo" />

      <div className="card-details">
        <div className="card-icons">
          <img src={cardChip} alt="card_chip" className="card_chip"/>
          <img src={cardIndicator} alt="card_indicator" className="card_indicator"/>
        </div>
        <h2 className='card-number'>5125 0012 1234 1234</h2>
        <span>valid thru</span>
        <h3 className='exp-date'>01/28</h3>
        <h4 className='card-name'>firstname lastname</h4>
      </div>
    </div>
  )
}

export default BankCard;
