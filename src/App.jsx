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
  {
    email: "cyril.cero@gmail.com",
    password: "123456",
    firstName: "Cyril",
    lastName: "Cero",
    accountID: Date.now()
      .toString()
      .replace(/^\d{3}/, "01"),
    isAdmin: false,
    accountBalance: 50000,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@email.com",
    password: "123456",
    accountBalance: 0,
    isAdmin: false,
    accountID: Date.now()
    .toString()
    .replace(/^\d{3}/, "02"),
  }
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
