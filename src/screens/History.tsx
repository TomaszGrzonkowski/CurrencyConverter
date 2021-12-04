import React, { useState, useEffect } from "react";
import ConversionItem from "../components/ConversionItem";
import { ConversionObj } from "../models/ConversionObj.interface";

const History: React.FC = (): JSX.Element => {
  const [conversions, setConvertions] = useState<ConversionObj[]>([]);

  const handleGetSavedConversions = () => {
    const conversions = localStorage.getItem("conversions");
    if (conversions) {
      const parsedConversions = JSON.parse(conversions);
      setConvertions(parsedConversions);
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem("conversions");
    setConvertions([]);
  };

  useEffect(() => {
    handleGetSavedConversions();
  }, []);

  return (
    <div className="contentWrapper">
      <p>History</p>
      {!!conversions.length && (
        <button className="button" onClick={handleClearHistory}>
          Clear history
        </button>
      )}
      {conversions.map((el, index) => (
        <ConversionItem item={el} key={index} />
      ))}
    </div>
  );
};

export default History;
