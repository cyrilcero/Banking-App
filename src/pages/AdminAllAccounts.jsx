import { formatCurrency } from "../utils/helpers";
import { getLocalStorage } from "../utils/localStorage";
import UsersBalanceChart from "./UsersBalanceChart";
import { useState } from "react";

const style = {
  textTransform: "capitalize",
};

function AdminAllAccounts() {
  const allAccounts = getLocalStorage("UserAccounts");
  const [accounts, setAccounts] = useState(allAccounts);
  const clientAccounts = accounts.filter((item) => item.isAdmin === false);

  const users = allAccounts.filter((item) => item.isAdmin === false);
  const users_email = users.map((item) => item.email);
  const users_balance = users.map((item) => Number(item.accountBalance));

  const labels = users_email;
  const balance = users_balance;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Account Balance",
        data: balance,
        backgroundColor: "rgba(62, 157, 208, 1)",
      },
    ],
  };

  return (
    <>
      <div className="panel-admindash">
        <div className="client-barchart">
          <UsersBalanceChart data={data} options={options} />
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
                    <td>{formatCurrency(+user.accountBalance)}</td>
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
