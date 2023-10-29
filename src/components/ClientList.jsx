import React from "react";
import getLocalStorage from "../utils/getLocalStorage";

function ClientList() {
  const userList = getLocalStorage("UserAccounts");
  const clientList = userList.filter((item) => item.isAdmin === false);

  return (
    <table className="client-list-table">
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
        {clientList.map((user, idx) => (
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
  );
}

export default ClientList;
