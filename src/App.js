import HistoricalData from "./components/historical_data/HistoricalData";
import OderoMap from "./components/map/OderoMap";

import React, { useState, useEffect, useRef } from "react";

function App() {
  const [paymentDataArray, setPaymentDataArray] = useState([]);
  const [logData, setLogData] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/data"); // Change to your WebSocket URL

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Received data:", data);

      const {
        lastDayPaymentSum,
        lastOneHourPaymentSum,
        paymentCounterDay,
        paymentCounterHour,
      } = data;

      const newJsonData = {
        lastDayPaymentSum,
        lastOneHourPaymentSum,
        paymentCounterDay,
        paymentCounterHour,
      };

      setLogData(newJsonData);

      const { city, amount } = data;

      setPaymentDataArray((prevArray) => [...prevArray, { city, amount }]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleDataProcessed = (processedData) => {
    setPaymentDataArray((prevData) =>
      prevData.filter((data) => data !== processedData)
    );
  };

  return (
    <div>
      <OderoMap
        paymentData={paymentDataArray}
        onProcessed={handleDataProcessed}
      />
      <HistoricalData logData={logData} />
    </div>
  );
}

export default App;
