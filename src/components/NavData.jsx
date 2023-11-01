import React from 'react';
import { FaMoneyBillTransfer, FaGear, } from "react-icons/fa6";
import { BsBank, BsFillWalletFill } from "react-icons/bs";
import { BiSolidWallet } from 'react-icons/bi';

// Pages
import ClientOverview from '../pages/ClientOverview';
import CashIn from '../pages/CashIn';
import Transfer from '../pages/Transfer';
import Settings from '../pages/Settings';
import BudgetApp from '../pages/BudgetApp';


export const NavData = [
  {
    id: 0,
    icon: <BsBank />,
    text: "Overview",
    link: "/overview", 
    elementLabel: <ClientOverview />,
  },
  {
    id: 1,
    icon: <BsFillWalletFill />,
    text: "Cash In",
    link: "/cash-in", 
    elementLabel: <CashIn />,
  },
  {
    id: 2,
    icon: <FaMoneyBillTransfer />,
    text: "Transfer",
    link: "/transfer", 
    elementLabel: <Transfer />,
  },
  {
    id: 3,
    icon: <BiSolidWallet />,
    text: "Budget App",
    link: "/budget-app", 
    elementLabel: <BudgetApp />,
  },
  {
    id: 4,
    icon: <FaGear />,
    text: "Settings",
    link: "/settings", 
    elementLabel: <Settings />,
  },

];

