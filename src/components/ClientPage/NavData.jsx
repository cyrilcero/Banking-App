import React from 'react';
import { FaMoneyBillTransfer, FaGear } from "react-icons/fa6";
import { BsBank, BsFillWalletFill } from "react-icons/bs";

import ClientOverview from './ClientOverview';
import CashIn from './CashIn';
import Transfer from './Transfer';
import {Settings} from '../SharedComponent';

export const NavData = [
  {
    id: 0,
    icon: <BsBank />,
    text: "Overview",
    link: `/overview`, 
    elementLabel: <ClientOverview />,
  },
  {
    id: 1,
    icon: <BsFillWalletFill />,
    text: "Cash In",
    link: "cash-in", 
    elementLabel: <CashIn />,
  },
  {
    id: 2,
    icon: <FaMoneyBillTransfer />,
    text: "Transfer",
    link: "transfer", 
    elementLabel: <Transfer />,
  },
  {
    id: 3,
    icon: <FaGear />,
    text: "Settings",
    link: "settings", 
    elementLabel: <Settings />,
  },

];

