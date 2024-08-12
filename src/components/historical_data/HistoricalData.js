import React from "react";
import "./HistoricalData.scss";
import { Card, CardContent, Typography } from "@mui/material";

const PaymentCard = ({ title, paymentSum, transactionCount }) => (
  <Card variant="outlined" sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography variant="h6" component="div" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        İşlem Hacmi: {paymentSum ? `${paymentSum.toFixed(2)} ₺` : ""}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        İşlem Sayısı: {transactionCount}
        İşlem Sayısı: {transactionCount}
      </Typography>
    </CardContent>
  </Card>
);

export default function HistoricalData({ logData }) {
  return (
    <div className="historicalData">
      {/* <div className="lastHour">
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
      </div> */}
      <PaymentCard
        title="Son 1 saat"
        paymentSum={logData ? logData.lastOneHourPaymentSum : null}
        transactionCount={logData ? logData.paymentCounterHour : null}
      />
      <PaymentCard
        title="Son 1 gün"
        paymentSum={logData ? logData.lastDayPaymentSum : null}
        transactionCount={logData ? logData.paymentCounterDay : null}
      />
    </div>
  );
}
