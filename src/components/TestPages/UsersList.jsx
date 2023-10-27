import React, { useEffect, useState } from 'react';


const getExistingUsers = () => {
  const userAccounts = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  return userAccounts;
}

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const existingUsers = getExistingUsers;
    setUsers(existingUsers);
  }, []);


  return (
    <div>
      <h2>Existing Users:</h2>
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Mobile Number</th>
            <th>Account Balance</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.accountID}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.birthday}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.accountBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
