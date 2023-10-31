import { useState } from "react";
import getLocalStorage from "../utils/getLocalStorage";

function ClientList() {
  const userList = getLocalStorage("UserAccounts");
  const clientList = userList.filter((item) => item.isAdmin === false);
  const recentAccounts = clientList
    .slice(userList.length - 4, userList.length)
    .slice()
    .reverse();
    
  return (
    <div className="client-list-table">
      <h1>Newly Created Accounts</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Account ID</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {recentAccounts.map((user, idx) => (
            <tr key={idx}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.accountID}</td>
              <td>{user.accountBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
