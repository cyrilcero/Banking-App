import "./App.css";
import { Link } from "react-router-dom";

// Test Pages -- Remove later
import LandingPage from "./components/TestPages/LandingPage";

function App() {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <LandingPage />
      <Link to={"/create-account"}>GO TO CREATE ACCOUNT</Link>
      <Link to={"/login"}>GO TO LOGIN</Link>

    </div>
  );
}

export default App;
