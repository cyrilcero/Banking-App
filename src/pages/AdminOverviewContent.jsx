import { useNavigate } from "react-router-dom";
import CashInForm from "../components/CashInForm";
import ClientList from "../components/ClientList";
import addUserImg from "../assets/admindashAddUser.png";
import { getLocalStorage } from "../utils/localStorage";
import { useState } from "react";

export default function AdminOverviewContent() {
  const userList = getLocalStorage("UserAccounts");
  const [users, setUsers] = useState(userList);

  const nav = useNavigate();
  const handleClick = () => {
    nav("/admin/create-new-account");
  };

  return (
    <>
      <div className="panel-admindash">
        <div className="content1">
          <CashInForm setter={setUsers} />
        </div>

        <div className="client-list-createdaccount">
          <ClientList appUsers={users} setAppUsers={setUsers} />
        </div>

        <div className="content3">
          <img id="add-user-img" src={addUserImg} alt="add_user_img" />
          <div className="text-box">
            <h2>Not a client yet?</h2>
            <button onClick={handleClick}>
              <h3>Create New Account</h3>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
