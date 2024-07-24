import React from "react";
import "./HistoricalData.scss";

export default function HistoricalData({ logData }) {
  return (
    <div className="historicalData">
      <div className="lastHour">
        <h3>Last Hour Payment Data</h3>
        <p>
          Payment Sum:{" "}
          {logData ? `${logData.lastOneHourPaymentSum.toFixed(2)} ₺` : ""}
        </p>
        <p>
          Number of Transactions: {logData ? logData.paymentCounterHour : ""}
        </p>
      </div>
      <div className="lastDay">
        <h3>Last Day Payment Data</h3>
        <p>
          Payment Sum:{" "}
          {logData ? `${logData.lastDayPaymentSum.toFixed(2)} ₺` : ""}
        </p>
        <p>
          Number of Transactions: {logData ? logData.paymentCounterDay : ""}
        </p>
      </div>
    </div>
  );
}
