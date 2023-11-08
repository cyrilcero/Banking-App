import { HomeNavBar } from "./components/HomeNavBar";
import { Outlet } from "react-router-dom";
import { setLocalStorage } from "./utils/localStorage";

const adminAccount = [
  {
    email: "admin@email.com",
    password: "admin00",
    firstName: "Admin",
    accountID: Date.now()
      .toString()
      .replace(/^\d{3}/, "00"),
    isAdmin: true,
  },
];

if (localStorage.getItem("UserAccounts") === null) {
  setLocalStorage("UserAccounts", adminAccount);
}

function App() {
  return (
    <>
      <HomeNavBar />
      <Outlet />
    </>
  );
}

export default App;
