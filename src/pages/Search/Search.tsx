import "./styles.scss";
import "./multirangeslider.css";
import { useSearchParams } from "react-router-dom";
import { Product } from "../../App";
import { useSelector } from "react-redux";
import { selectProducts } from "../../utils/redux/productsSlice";
import Tile from "../../components/Tile/Tile";
import { useState, useEffect } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Search: React.FC = () => {
 type FilterState = {
  visible: boolean;
  rotated: boolean;
 };

 type FilterStates = {
  price: FilterState;
  categories: FilterState;
 };

 const [searchParams, setSearchParams] = useSearchParams();
 const query = searchParams.get("q");
 const minPriceParam = parseInt(searchParams.get("minPrice") || "", 10);
 const maxPriceParam = parseInt(searchParams.get("maxPrice") || "", 10);

 const products: Product[] = useSelector(selectProducts);

 const [minPrice, setMinPrice] = useState<number | null>(null);
 const [maxPrice, setMaxPrice] = useState<number | null>(null);

 const [filterStates, setFilterStates] = useState<FilterStates>({
  price: { visible: false, rotated: false },
  categories: { visible: false, rotated: false }
 });

 useEffect(() => {
  if (!searchParams.has("minPrice")) setMinPrice(null);
  if (!searchParams.has("maxPrice")) setMaxPrice(null);

  setMinPrice(minPriceParam);
  setMaxPrice(maxPriceParam);
 }, [searchParams, minPriceParam, maxPriceParam]);

 const handleFilterToggle = (filterType: keyof FilterStates) => {
  setFilterStates((prevStates) => ({
   ...prevStates,
   [filterType]: {
    ...prevStates[filterType],
    visible: !prevStates[filterType].visible
   }
  }));
 };

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const newSearchParams = new URLSearchParams(searchParams);

  if (minPrice) newSearchParams.set("minPrice", minPrice.toString());
  else newSearchParams.delete("minPrice");

  if (maxPrice) newSearchParams.set("maxPrice", maxPrice.toString());
  else newSearchParams.delete("maxPrice");

  setSearchParams(newSearchParams);
 };

 const handleInput = (e: ChangeResult) => {
  if (e.minValue <= e.maxValue) {
    setMinPrice(e.minValue);
    setMaxPrice(e.maxValue);
  }
 };

 const filteredProducts = query
  ? products.filter(
     (product) =>
      product?.name.toLowerCase().includes(query.toLowerCase()) &&
      (minPriceParam ? product?.price > minPriceParam : true) &&
      (maxPriceParam ? product?.price < maxPriceParam : true)
    )
  : products;

 return (
  <main className="search">
   <p className="query">{`Search results for "${query}" (${filteredProducts.length})`}</p>
   <div>
    <form
     className="filters"
     onSubmit={handleSubmit}
    >
     <div
      className={`filters__filter ${filterStates.price.visible ? "shown" : ""}`}
     >
      <div className="filters__filter--header">
       <span>Price</span>
       <div
        className={`filters__filter--show-icon ${
         filterStates.price.visible ? "rotated" : ""
        }`}
        onClick={() => handleFilterToggle("price")}
       >
        <ChevronDownIcon />
       </div>
      </div>
      <div
       className={`filters__filter--content ${
        filterStates.price.visible ? "shown" : ""
       }`}
      >
       <div className="filters__filter--range-slider-container">
        <MultiRangeSlider
         min={0}
         max={500}
         step={5}
         minValue={minPrice || 0}
         maxValue={maxPrice || 500}
         ruler={false}
         label={false}
         onInput={(e) => handleInput(e)}
         baseClassName="filters__filter--range-slider"
        />
       </div>
       <div className="filters__filter--values-container">
        <div className="filters__filter--field">
         <span>$</span>
         <input
          min={0}
          max={maxPrice || 500}
          type="number"
          value={minPrice !== null ? minPrice : ""}
          onChange={(e) => setMinPrice(parseInt(e.target.value, 10))}
         />
        </div>
        <span>to</span>
        <div className="filters__filter--field">
         <span>$</span>
         <input
          min={minPrice || 0}
          max={500}
          type="number"
          value={maxPrice !== null ? maxPrice : ""}
          onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
         />
        </div>
       </div>
      </div>
     </div>
     <div
      className={`filters__filter ${
       filterStates.categories.visible ? "shown" : ""
      }`}
     >
      <div className="filters__filter--header">
       <span>Categories</span>
       <div
        className={`filters__filter--show-icon ${
         filterStates.categories.visible ? "rotated" : ""
        }`}
        onClick={() => handleFilterToggle("categories")}
       >
        <ChevronDownIcon />
       </div>
      </div>
      <div
       className={`filters__filter--content ${
        filterStates.categories.visible ? "shown" : ""
       }`}
      >
       <ul className="filters__category-list">
        <li className="filters__category-item">
         <input
          type="checkbox"
          id="woman"
          className="filters__category-checkbox"
         />
         <label
          htmlFor="woman"
          className="filters__category-label"
         >
          Woman
         </label>
        </li>
        <li className="filters__category-item">
         <input
          type="checkbox"
          id="man"
          className="filters__category-checkbox"
         />
         <label
          htmlFor="man"
          className="filters__category-label"
         >
          Man
         </label>
        </li>
       </ul>
      </div>
     </div>
     <button className="filters__submit-button">Apply</button>
    </form>
   </div>
   <section
    className="section"
    id="results"
   >
    {filteredProducts.map((product) => (
     <Tile
      key={product.id}
      product={product}
     />
    ))}
   </section>
  </main>
 );
};

export default Search;
