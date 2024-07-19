import HistoricalData from "./components/historical_data/HistoricalData";
import OderoMap from "./components/map/OderoMap";

import React, { useState, useEffect, useRef } from "react";

function App() {
  const [aggregatedDataArray, setAggregatedDataArray] = useState([]);
  const [logData, setLogData] = useState(null);
  const dataMap = useRef(new Map());
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
      if (dataMap.current.has(city)) {
        dataMap.current.set(city, dataMap.current.get(city) + amount);
      } else {
        dataMap.current.set(city, amount);
      }
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

  useEffect(() => {
    const interval = setInterval(() => {
      const newDataArray = [];
      dataMap.current.forEach((amount, city) => {
        newDataArray.push({ city, amount });
      });

      setAggregatedDataArray(newDataArray);
      dataMap.current.clear();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <OderoMap data={aggregatedDataArray} />
      <HistoricalData logData={logData} />
    </div>
  );
}

export default App;
