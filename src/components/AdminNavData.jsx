import React from 'react';
import { HiUserPlus, HiUserGroup } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

import AdminCreateAccount from '../pages/AdminCreateAccount.jsx'

export const AdminNavData = [
  {
    id: 0,
    icon: <MdSpaceDashboard />,
    text: "Dashboard",
    link: "/admin", 
    elementLabel: "",
  },
  {
    id: 1,
    icon: <HiUserPlus />,
    text: "Create Account",
    link: "/admin/create-new-account", 
    elementLabel: <AdminCreateAccount />,
  },
  {
    id: 2,
    icon: <HiUserGroup />,
    text: "All Accounts",
    link: "/admin/all-accounts", 
    elementLabel: "",
  },
  {
    id: 3,
    icon: <FaGear />,
    text: "Settings",
    link: "/admin/settings", 
    elementLabel: "",
  },

];

