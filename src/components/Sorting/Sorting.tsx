import { ArrowDownIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Sorting.scss";

const Sorting: React.FC = () => {
 const [searchParams, setSearchParams] = useSearchParams();

 const [sortOrder, setSortOrder] = useState("desc");
 const [sortBy, setSortBy] = useState("popularity");
 const [sortingOptionsHidden, setSortingOptionsHidden] = useState(true);

 useEffect(() => {
  if (searchParams.has("sort_order")) {
   setSortOrder(searchParams.get("sort_order") || "");
  } else {
   setSortOrder("desc");
  }
  if (searchParams.has("sort_by")) {
   setSortBy(searchParams.get("sort_by") || "");
  } else {
   setSortBy("popularity");
  }
 }, [searchParams]);

 const handleSortOptionClick = (selectedSortBy: "popularity" | "price" | "alphabetically") => {
  const newSearchParams = new URLSearchParams(searchParams);

  if (selectedSortBy === sortBy) {
   const newOrder = sortOrder === "asc" ? "desc" : "asc";
   setSortOrder(newOrder);
   newSearchParams.set("sort_order", newOrder);
  } else {
   setSortOrder("asc");
   setSortBy(selectedSortBy);
   newSearchParams.set("sort_order", "asc");
   newSearchParams.set("sort_by", selectedSortBy);
  }

  setSearchParams(newSearchParams);
 };

 return (
  <div className="sorting">
   <div
    className="sorting__sort-icon"
    onClick={() => setSortingOptionsHidden(!sortingOptionsHidden)}
   >
    <ArrowsUpDownIcon />
   </div>
   <div className={`sorting__sort-options ${sortingOptionsHidden && "hidden"}`}>
    <div
     className={`sorting__sort-option ${sortBy === "popularity" && "sorting__sort-option-active"}`}
     onClick={() => handleSortOptionClick("popularity")}
    >
     <span className="sorting__sort-option-name">Popularity</span>
     <div
      className={`sorting__sort-option-icon ${
       sortOrder === "asc" && sortBy === "popularity" && "rotated"
      }`}
     >
      {sortBy === "popularity" && <ArrowDownIcon />}
     </div>
    </div>
    <div
     className={`sorting__sort-option ${sortBy === "price" && "sorting__sort-option-active"}`}
     onClick={() => handleSortOptionClick("price")}
    >
     <span className="sorting__sort-option-name">Price</span>
     <div
      className={`sorting__sort-option-icon ${
       sortOrder === "asc" && sortBy === "price" && "rotated"
      }`}
     >
      {sortBy === "price" && <ArrowDownIcon />}
     </div>
    </div>
    <div
     className={`sorting__sort-option ${
      sortBy === "alphabetically" && "sorting__sort-option-active"
     }`}
     onClick={() => handleSortOptionClick("alphabetically")}
    >
     <span className="sorting__sort-option-name">Alphabetically</span>
     <div
      className={`sorting__sort-option-icon ${
       sortOrder === "asc" && sortBy === "alphabetically" && "rotated"
      }`}
     >
      {sortBy === "alphabetically" && <ArrowDownIcon />}
     </div>
    </div>
   </div>
  </div>
 );
};

export default Sorting;
