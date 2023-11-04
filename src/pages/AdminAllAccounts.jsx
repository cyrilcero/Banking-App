import { getLocalStorage } from "../utils/localStorage";

function AdminAllAccounts() {
  const allAccounts = getLocalStorage("UserAccounts");
  const clientAccounts = allAccounts.filter((item) => item.isAdmin === false);
  return (
    <>
      <div className="panel-admindash">
        <div className="client-list">
          <div className="client-list-table">
            <h1>Client Accounts</h1>
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
                {clientAccounts.map((user, idx) => (
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
      </div>
    </>
  );
}

export default AdminAllAccounts;
