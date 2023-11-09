import "../App.css";
import guy from "../assets/guy.png";
import wing from "../assets/pngwing1.png";
import girl from "../assets/clapping.png";
import hands from "../assets/giving.png";
import tree from "../assets/growWith-us.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  function handleClick(){
    nav("/create-account")
  }
  return (
    <div className="container">
      {" "}
      <div id="one">
        <img src={wing} alt="logo" />
        <span>Welcome to WindBank!</span>
      </div>
      <div id="two">
        <img src={guy} alt="erwan-img" />
        <p>
          “You need a bank partner who believes in you and is able to keep up
          with your financial needs. Wind Bank believed in me through the years.
          To me, that’s BetterBanking” - Erwan Heussaff
        </p>
      </div>
      <div id="three">
        <p>
          Enjoy up to 10% interest p.a. daily with just 1 ID and no minimum
          balance
        </p>
        <button onClick={handleClick}>APPLY NOW!</button>
      </div>
      <div id="four">
        <h1>With Real-Time Expense Monitoring:</h1>
        <p>
          WindBank offers real-time tracking of your spending habits. It
          categorizes your expenses automatically, making it easy to see where
          your money is going.
        </p>
      </div>
      <div id="five">
        <img src={girl} alt="3d-girl" />
      </div>
      <div id="six">
        <img src={hands} alt="hand with coins" />
      </div>
      {/* <div id="tree">
        <img src={tree} alt="tree" />
        <span>Grow your money with us!</span>
      </div> */}
    </div>
  );
}
