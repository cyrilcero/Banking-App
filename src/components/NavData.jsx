import React from 'react';
import { FaMoneyBillTransfer, FaGear } from "react-icons/fa6";
import { BsBank, BsFillWalletFill } from "react-icons/bs";

export const NavData = [
  {
    id: 0,
    icon: <BsBank />,
    text: "Overview",
    link: "/"
  },
  {
    id: 1,
    icon: <BsFillWalletFill />,
    text: "Cash In",
    link: "cash-in"
  },
  {
    id: 2,
    icon: <FaMoneyBillTransfer />,
    text: "Transfer",
    link: "transfer"
  },
  {
    id: 3,
    icon: <FaGear />,
    text: "Settings",
    link: "settings"
  }
];
