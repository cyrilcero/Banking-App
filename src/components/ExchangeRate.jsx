import { useState } from "react";
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

const API_KEY = "032687021c8940b7865c86f833f34523";

fetch(`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    setLocalStorage("ExchangeRate", data);
  });

function ExchangeRate() {
  const getData = getLocalStorage("ExchangeRate");
  const [exchangeRateData, setExchangeRateData] = useState(getData);

  const timestamp = exchangeRateData.timestamp;
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  let exchangeRate = exchangeRateData.rates.PHP.toFixed(2);

  return (
    <>
      <div className="exchange-rate-container">
        <h1 className="exchange-rate-title">
          USD to PHP Exchange Rate
        </h1>
        <h1 className="exchange-rate-value">{`1$ = ₱${exchangeRate}`}</h1>
        <span className="exchange-rate-update">{`Last Updated: ${year}-${month}-${day} ${hours}:${minutes}`}</span>
      </div>
    </>
  );
}

export default ExchangeRate;
