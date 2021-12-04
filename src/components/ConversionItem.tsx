import { ConversionObj } from "../models/ConversionObj.interface";

interface ConversionItemProps {
  item: ConversionObj;
}

const ConversionItem = ({ item }: ConversionItemProps): JSX.Element => {
  return (
    <div className="conversionWrapper">
      <span className="date">{item.date}</span>
      <span>
        {`${item.amount} 
        ${item.from}`}
      </span>
      <span className="equal">=</span>
      <span>
        {`${Number(item.conversion * item.amount).toFixed(2)} 
        ${item.to}`}
      </span>
    </div>
  );
};

export default ConversionItem;
