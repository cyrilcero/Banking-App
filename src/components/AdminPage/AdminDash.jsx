import { Outlet } from "react-router-dom";
import {GreetingDash} from "../SharedComponent";
import AdminNavBar from "./AdminNavbar";

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
