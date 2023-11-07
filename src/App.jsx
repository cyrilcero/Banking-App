import { HomeNavBar } from "./components/HomeNavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <HomeNavBar />
      <Outlet />
    </>
  );
}

export default App;
