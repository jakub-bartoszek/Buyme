import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Sorting from "../../components/Sorting/Sorting";
import "./Searchbar.scss";

const Searchbar: React.FC = () => {
 const [searchParams, setSearchParams] = useSearchParams();
 const [searchQuery, setSearchQuery] = useState<string>("");

 useEffect(() => {
  if (searchParams.has("query")) {
   setSearchQuery(searchParams.get("query") || "");
  } else {
   setSearchQuery("");
  }
 }, [searchParams]);

 const handleQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const newSearchParams = new URLSearchParams(searchParams);

  if (searchQuery) newSearchParams.set("query", searchQuery);
  else newSearchParams.delete("query");

  setSearchParams(newSearchParams);
 };

 const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
 };

 return (
  <form
   className="searchbar"
   onSubmit={handleQuerySubmit}
  >
   <div className="searchbar__input-wrapper">
    <div className="searchbar__search-icon">
     <MagnifyingGlassIcon />
    </div>
    <input
     className="searchbar__input"
     value={searchQuery}
     onChange={handleQueryChange}
    />
   </div>
   <Sorting />
  </form>
 );
};

export default Searchbar;
