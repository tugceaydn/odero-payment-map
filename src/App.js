import React, { useState, useEffect, useRef } from "react";
import OderoMap from "../src/components/map/OderoMap";

function App() {
  const [aggregatedDataArray, setAggregatedDataArray] = useState([]);
  const dataMap = useRef(new Map());
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/data"); // Change to your WebSocket URL

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);

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
      {/* <ul>
        {aggregatedDataArray.map((e) => (
          <li>{e.city}</li>
        ))}
      </ul> */}
      <OderoMap data={aggregatedDataArray} />
    </div>
  );
}

export default App;
