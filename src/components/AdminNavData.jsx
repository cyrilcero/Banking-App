import React from 'react';
import { HiUserPlus, HiUserGroup } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

export const AdminNavData = [
  {
    id: 0,
    icon: <MdSpaceDashboard />,
    text: "Dashboard",
    link: "/dashboard", 
    elementLabel: "",
  },
  {
    id: 1,
    icon: <HiUserPlus />,
    text: "Create Account",
    link: "/create-new-account", 
    elementLabel: "",
  },
  {
    id: 2,
    icon: <HiUserGroup />,
    text: "All Accounts",
    link: "/all-accounts", 
    elementLabel: "",
  },
  {
    id: 3,
    icon: <FaGear />,
    text: "Settings",
    link: "/settings", 
    elementLabel: "",
  },

];

