import CashInAdminFromUserToUser from "../components/CashInAdminFromUserToUser";

function AdminCreateAccount() {
  return (
    <div className="panel-admindash">
      <div className="admin-transfer-money">
        <CashInAdminFromUserToUser />
      </div>
    </div>
  );
}

export default AdminCreateAccount;
