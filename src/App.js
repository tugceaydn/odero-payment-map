import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import "./App.css";
import TurkeyMap from "turkey-map-react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { fetchPaymentData, startPaymentGeneration } from "./paymentService";

function App() {
  const [highlightedCityIndex, setHighlightedCityIndex] = useState(0);
  const [paymentData, setPaymentData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {


    const getData = async () => {
      try {
        const data = await fetchPaymentData();
        setPaymentData(data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };
    getData();
    const interval = setInterval(() => {
      if (paymentData.length > 0) {
        setHighlightedCityIndex(
          (prevIndex) => (prevIndex + 1) % paymentData.length
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [paymentData.length]);



  const renderCity = (cityComponent, cityData) => {
    console.log("paymentData: ", paymentData)
    const paymentInfo = paymentData.find((data) => data.city === cityData.name);
    const isHighlighted =
      paymentInfo && paymentData[highlightedCityIndex]?.city === cityData.name;

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
