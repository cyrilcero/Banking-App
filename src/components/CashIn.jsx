import React from "react";
import GreetingDash from "./GreetingDash";
import ClientDashboard from "./ClientDashboard";
import { CashInFunc } from "./CashInFunc";


function CashIn() {
  return (
    <section className="cash-in">
      <GreetingDash />
      <ClientDashboard />
      <div className="panel2-cashin">
        <div className="transactions-cashin">
         <CashInFunc/>
        </div>
      </div>
    </section>
  );
}

export default CashIn;
