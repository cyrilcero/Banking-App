import { formatCurrency } from "../utils/helpers";

const style = {
  textTransform: "capitalize",
};

function ClientList({ displayCount, clients, totalExpenses }) {
  const clientList = clients.filter((item) => item.isAdmin === false);
  // sort and slice
  clientList.sort((a, b) => b.accountID - a.accountID);
  const displayClients = clientList.slice(0, displayCount);
  return (
    <div className="client-list-table">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Account ID</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        <tbody>
          {displayClients.map((user, index) => (
            <tr key={index}>
              <td style={style}>{user.firstName}</td>
              <td style={style}>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.accountID}</td>
              <td>{formatCurrency(+user.newBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
