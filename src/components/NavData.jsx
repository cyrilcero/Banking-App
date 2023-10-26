import React from 'react';
import { FaMoneyBillTransfer, FaGear } from "react-icons/fa6";
import { BsBank, BsFillWalletFill } from "react-icons/bs";

import ClientOverview from './ClientOverview';
import CashIn from './CashIn';
import Transfer from './Transfer';
import Settings from './Settings';

// retrieve CurrentUser (@ local storage) values
const currentUser = JSON.parse(localStorage.getItem('CurrentUser') || '{}');
const accountID = currentUser.accountID;

export const NavData = [
  {
    id: 0,
    icon: <BsBank />,
    text: "Overview",
    link: `/overview/${accountID}`, 
    elementLabel: <ClientOverview />,
  },
  {
    id: 1,
    icon: <BsFillWalletFill />,
    text: "Cash In",
    link: `/cash-in/${accountID}`, 
    elementLabel: <CashIn />,
  },
  {
    id: 2,
    icon: <FaMoneyBillTransfer />,
    text: "Transfer",
    link: `/transfer/${accountID}`, 
    elementLabel: <Transfer />,
  },
  {
    id: 3,
    icon: <FaGear />,
    text: "Settings",
    link: `/settings/${accountID}`, 
    elementLabel: <Settings />,
  },

];

