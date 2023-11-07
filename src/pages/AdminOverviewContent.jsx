import { useNavigate } from "react-router-dom";
import CashInForm from "../components/CashInForm";
import ClientList from "../components/ClientList";
import addUserImg from "../assets/admindashAddUser.png";
import { getLocalStorage } from "../utils/localStorage";


function AdminOverviewContent() {
  const clients = getLocalStorage('UserAccounts');;
  const nav = useNavigate();  
  
  const handleClick = () => {
    nav("/admin/create-new-account");
  };
  
  return (
    <>
      <div className="panel-admindash">
        <div className="content1">
          <CashInForm />
        </div>

        <div className="client-list-createdaccount">
          <h1>Recently Created Accounts</h1>
          <ClientList
            displayCount={3}
            clients={clients}
          />
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

export default AdminOverviewContent