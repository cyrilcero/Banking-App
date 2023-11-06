import { useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

function ClientList() {
  const userList = getLocalStorage("UserAccounts");
  const [users, setUsers] = useState(userList);
  const clientList = users.filter((item) => item.isAdmin === false);
  const recentAccounts = clientList
    .slice(userList.length - 10, userList.length)
    .slice()
    .reverse();

  return (
    <div className="client-list-table">
      <h1>Newly Created Accounts</h1>
      <div className="client-list-table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Mobile Number</th>
              <th>Account ID</th>
              <th>Account Balance</th>
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
    </div>
  );
}

export default ClientList;
