import { ToastContainer } from "react-toastify";
import { HomeNavBar } from "./components/HomeNavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <HomeNavBar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Outlet />
    </>
  );
}

export default App;
