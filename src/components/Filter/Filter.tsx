import { ChevronDownIcon } from "@heroicons/react/24/outline";
import "./Filter.scss";

interface FilterProps {
 filterType: string;
 visible: boolean;
 children: React.ReactNode;
 onFilterToggle: () => void;
}

const Filter: React.FC<FilterProps> = ({ filterType, visible, children, onFilterToggle }) => {
 return (
  <div className={`filters__filter ${visible ? "shown" : ""}`}>
   <div className="filters__filter--header">
    <span>{filterType}</span>
    <div
     className={`filters__filter--show-icon ${visible ? "rotated" : ""}`}
     onClick={onFilterToggle}
    >
     <ChevronDownIcon />
    </div>
   </div>
   <div className={`filters__filter--content ${visible ? "shown" : ""}`}>{children}</div>
  </div>
 );
};

export default Filter;
