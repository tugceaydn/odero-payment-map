import React, { useEffect, useState, useRef } from "react";
import { Tooltip } from "antd";
import "./OderoMap.scss";
import TurkeyMap from "turkey-map-react";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export default function OderoMap({ paymentData, onProcessed }) {
  const [highlightedCities, setHighlightedCities] = useState(new Map());
  const timeouts = useRef(new Map());

  useEffect(() => {
    paymentData.forEach((data, id) => {
      const { city, amount } = data;

      setHighlightedCities((prev) => {
        const updated = new Map(prev);
        updated.set(id, { city, amount, timeout: null });

        if (timeouts.current.has(id)) {
          clearTimeout(timeouts.current.get(id));
        }

        const timeout = setTimeout(() => {
          setHighlightedCities((current) => {
            const updatedCurrent = new Map(current);
            updatedCurrent.delete(id);
            return updatedCurrent;
          });
          timeouts.current.delete(id);
        }, 2000); // Highlight for 2 seconds

        timeouts.current.set(id, timeout);

        return updated;
      });

      onProcessed(id);
    });
  }, [paymentData, onProcessed]);

  const renderCity = (cityComponent, cityData) => {
    const highlightedEntry = Array.from(highlightedCities.values()).find(
      (entry) => entry.city === cityData.name
    );
    const paymentInfo = highlightedEntry ? highlightedEntry : null;

    return (
      <Tooltip
        title={
          <div className="tooltip-title">
            {cityData.name}
            <br />
            {paymentInfo ? `${paymentInfo.amount.toFixed(2)} ₺` : ""}
          </div>
        }
        key={cityData.id}
        color="#2c2e2c"
        open={!!paymentInfo}
      >
        {React.cloneElement(cityComponent.props.children, {
          style: {
            ...cityComponent.props.children.props.style,
            fill: paymentInfo ? "#6CD14E" : "#aaaaac",
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
