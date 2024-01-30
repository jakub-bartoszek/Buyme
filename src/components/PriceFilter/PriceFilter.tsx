import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import "./PriceFilter.scss";
import "./multirangeslider.scss";

interface PriceFilterProps {
 min: number;
 max: number;
 step: number;
 minValue: number;
 maxValue: number;
 visible: boolean;
 onFilterToggle: () => void;
 onSliderInput: (e: ChangeResult) => void;
 onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
 min,
 max,
 step,
 minValue,
 maxValue,
 visible,
 onFilterToggle,
 onSliderInput,
 onMinPriceChange,
 onMaxPriceChange
}) => {
 return (
  <div className={`filters__filter ${visible ? "shown" : ""}`}>
   <div className="filters__filter--header">
    <span>Price</span>
    <div
     className={`filters__filter--show-icon ${visible ? "rotated" : ""}`}
     onClick={onFilterToggle}
    >
     <ChevronDownIcon />
    </div>
   </div>
   <div className={`filters__filter--content ${visible ? "shown" : ""}`}>
    <div className="filters__filter--range-slider-container">
     <MultiRangeSlider
      min={min}
      max={max}
      step={step}
      minValue={minValue}
      maxValue={maxValue}
      ruler={false}
      label={false}
      onChange={onSliderInput}
      baseClassName="filters__filter--range-slider"
     />
    </div>
    <div className="filters__filter--values-container">
     <div className={`filters__filter--field ${minValue > maxValue && "incorrect"}`}>
      <span>$</span>
      <input
       min={min}
       max={maxValue}
       maxLength={3}
       type="number"
       value={minValue !== null ? minValue : ""}
       onChange={onMinPriceChange}
      />
     </div>
     <span>to</span>
     <div className={`filters__filter--field ${minValue > maxValue && "incorrect"}`}>
      <span>$</span>
      <input
       min={minValue || min}
       max={max}
       maxLength={3}
       type="number"
       value={maxValue !== null ? maxValue : ""}
       onChange={onMaxPriceChange}
      />
     </div>
    </div>
   </div>
  </div>
 );
};

export default PriceFilter;
