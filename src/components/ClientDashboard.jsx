import BankCard from "./BankCard";
import BalanceOverview from "./BalanceOverview";
import ExchangeRate from "./ExchangeRate";
// import { useLoaderData } from "react-router";

function ClientDashboard() {
  // const data = useLoaderData();
  // console.log(data);

  return (
    <section className="client-dashboard">
      <div className="panel1">
        <BalanceOverview />
        {/* <ExchangeRate /> */}
      </div>
    </section>
  );
}

export default ClientDashboard;
