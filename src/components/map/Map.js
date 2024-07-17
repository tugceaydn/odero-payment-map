import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import "./App.css";
import TurkeyMap from "turkey-map-react";
import { ReactComponent as Logo } from "./assets/logo.svg";

export default function Map() {
  const [highlightedCityIndex, setHighlightedCityIndex] = useState(0);
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      const response = await fetch("http://localhost:8080/api/payment-data");
      const data = await response.json();
      setPaymentData(data);
    };

    fetchPaymentData();

    const interval = setInterval(() => {
      setHighlightedCityIndex(
        (prevIndex) => (prevIndex + 1) % paymentData.length
      );
    }, 2000);

    console.log("index ", highlightedCityIndex);

    return () => clearInterval(interval);
  }, [paymentData.length]);

  const renderCity = (cityComponent, cityData) => {
    const paymentInfo = paymentData.find((data) => data.city === cityData.name);
    const isHighlighted =
      paymentInfo && paymentData[highlightedCityIndex].city === cityData.name;

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
