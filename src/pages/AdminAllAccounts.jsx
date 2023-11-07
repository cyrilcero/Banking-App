import { getLocalStorage } from "../utils/localStorage";
import UsersBalanceChart from "./UsersBalanceChart";

const style = {
  textTransform: 'capitalize',
};

function AdminAllAccounts() {
  const allAccounts = getLocalStorage("UserAccounts");
  const clientAccounts = allAccounts.filter((item) => item.isAdmin === false);
  return (
    <>
      <div className="panel-admindash">
        <div className="client-barchart">
          <UsersBalanceChart />
        </div>
        <div className="client-list">
          <div className="client-list-table">
            <h1>Client Accounts</h1>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Account ID</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {clientAccounts.map((user, idx) => (
                  <tr key={idx}>
                    <td style={style}>{user.firstName}</td>
                    <td style={style}>{user.lastName}</td>
                    <td>{user.email}</td>
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
