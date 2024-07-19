import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import "./OderoMap.scss";
import TurkeyMap from "turkey-map-react";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export default function OderoMap({ data }) {
  const [highlightedCities, setHighlightedCities] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      const newHighlights = {};
      data.forEach((item) => {
        newHighlights[item.city] = { amount: item.amount, timeout: null };
      });

      setHighlightedCities((prev) => {
        const updated = { ...prev, ...newHighlights };

        Object.keys(newHighlights).forEach((city) => {
          if (updated[city].timeout) {
            clearTimeout(updated[city].timeout);
          }

          updated[city].timeout = setTimeout(() => {
            setHighlightedCities((current) => {
              const updatedCurrent = { ...current };
              delete updatedCurrent[city];
              return updatedCurrent;
            });
          }, 2000); // Highlight for 2 seconds
        });

        return updated;
      });
    }
  }, [data]);

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
