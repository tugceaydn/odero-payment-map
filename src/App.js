import React, { useState, useEffect, useRef } from "react";

function App() {
  const [dataQueue, setDataQueue] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/data"); // Change to your WebSocket URL

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
      setDataQueue((prevQueue) => [...prevQueue, data]);
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

  return (
    <div>
      <h1>WebSocket Data</h1>
      <ul>
        {dataQueue.map((data, index) => (
          <li
            key={index}
          >{`${data.city}: ${data.amount} at ${data.timestamp}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
