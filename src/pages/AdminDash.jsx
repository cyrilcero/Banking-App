import { Outlet } from "react-router-dom";
import GreetingDash from "../components/GreetingDash";
import AdminNavBar from "../components/AdminNavbar";

function AdminDash() {
  return (
    <>
      <section className="admindash">
        <div className="admin-navbar">
          <AdminNavBar />
        </div>

        <div className="admindash-content">
          <GreetingDash />
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default AdminDash;
