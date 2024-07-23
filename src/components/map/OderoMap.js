import React, { useEffect, useState, useRef } from "react";
import { Tooltip } from "antd";
import "./OderoMap.scss";
import TurkeyMap from "turkey-map-react";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export default function OderoMap({ paymentData, onProcessed }) {
  const [highlightedCities, setHighlightedCities] = useState({});
  const timeouts = useRef(new Map());

  useEffect(() => {
    if (paymentData.length > 0) {
      const newData = paymentData[0];
      const { city, amount } = newData;

      setHighlightedCities((prev) => {
        const updated = { ...prev, [city]: { amount, timeout: null } };

        if (timeouts.current.has(city)) {
          clearTimeout(timeouts.current.get(city));
        }

        const timeout = setTimeout(() => {
          setHighlightedCities((current) => {
            const updatedCurrent = { ...current };
            delete updatedCurrent[city];
            return updatedCurrent;
          });
          timeouts.current.delete(city);
        }, 2000); // Highlight for 2 seconds

        timeouts.current.set(city, timeout);

        return updated;
      });

      onProcessed(newData);
    }
  }, [paymentData, onProcessed]);

  const renderCity = (cityComponent, cityData) => {
    const isHighlighted = highlightedCities.hasOwnProperty(cityData.name);
    const paymentInfo = isHighlighted ? highlightedCities[cityData.name] : null;

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
    <div className="map">
      <Logo className="logo" />
      <TurkeyMap cityWrapper={renderCity} />
    </div>
  );
}
