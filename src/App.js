import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import "./App.css";
import TurkeyMap from "turkey-map-react";
import { ReactComponent as Logo } from "./assets/logo.svg";

const payment_data = [
  { city: "İzmir", amount: 10 },
  { city: "İstanbul", amount: 100 },
  { city: "Malatya", amount: 3 },
  { city: "Adana", amount: 45 },
  { city: "Konya", amount: 1 },
];

function App() {
  const [highlightedCityIndex, setHighlightedCityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedCityIndex(
        (prevIndex) => (prevIndex + 1) % payment_data.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderCity = (cityComponent, cityData) => {
    const paymentInfo = payment_data.find(
      (data) => data.city === cityData.name
    );
    const isHighlighted =
      paymentInfo && payment_data[highlightedCityIndex].city === cityData.name;

    console.log("city ", cityData.name, "highlight ", isHighlighted);

    return (
      <Tooltip
        title={
          <div className="tooltip-title">
            {cityData.name}
            <br />
            {paymentInfo ? `${paymentInfo.amount}₺` : ""}
          </div>
        }
        key={cityData.id}
        color="#2c2e2c"
        open={isHighlighted}
      >
        {React.cloneElement(cityComponent.props.children, {
          style: {
            ...cityComponent.props.children.props.style,
            fill: isHighlighted ? "#6CD14E" : "#aaaaac",
            transition: "fill 0.5s",
          },
        })}
      </Tooltip>
    );
  };

  return (
    <div className="App">
      <Logo className="logo" />
      <TurkeyMap cityWrapper={renderCity} />
    </div>
  );
}

export default App;
