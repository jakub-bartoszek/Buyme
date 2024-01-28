import "./styles.scss";
import "./multirangeslider.scss";
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

 const [minPrice, setMinPrice] = useState<number>(0);
 const [maxPrice, setMaxPrice] = useState<number>(500);
 const [minPriceSlider, setMinPriceSlider] = useState<number>(0);
 const [maxPriceSlider, setMaxPriceSlider] = useState<number>(500);

 const [filterStates, setFilterStates] = useState<FilterStates>({
  price: { visible: false, rotated: false },
  categories: { visible: false, rotated: false }
 });

 useEffect(() => {
  if (!searchParams.has("minPrice") && !searchParams.has("maxPrice")) {
   setMinPrice(0);
   setMaxPrice(500);
  }

  if (minPriceParam < maxPriceParam) {
   setMinPrice(minPriceParam);
   setMaxPrice(maxPriceParam);
   setMinPriceSlider(minPriceParam);
   setMaxPriceSlider(maxPriceParam);
  }
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

  if (minPrice < maxPrice) {
   const newSearchParams = new URLSearchParams(searchParams);

   if (minPrice) newSearchParams.set("minPrice", minPrice.toString());
   else newSearchParams.delete("minPrice");

   if (maxPrice) newSearchParams.set("maxPrice", maxPrice.toString());
   else newSearchParams.delete("maxPrice");

   setSearchParams(newSearchParams);
  }
 };

 const handleSliderInput = (e: ChangeResult) => {
  setMinPrice(e.minValue);
  setMaxPrice(e.maxValue);
  if (e.minValue <= e.maxValue) {
   setMinPriceSlider(e.minValue);
   setMaxPriceSlider(e.maxValue);
  }
 };

 const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value);
  if (maxPrice < 20) {
   setMinPrice(0);
   setMinPriceSlider(0);
  } else {
   setMinPrice(value <= maxPrice - 20 ? Math.max(0, value) : maxPrice - 20);
   setMinPriceSlider(
    Math.min(
     value <= maxPrice - 20 ? Math.max(0, value) : maxPrice - 20,
     maxPrice
    )
   );
  }
 };

 const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value);
  setMaxPrice(Math.max(0, Math.min(value, 500)));
  setMaxPriceSlider(Math.max(value, minPrice));
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
         step={20}
         minValue={minPriceSlider || 0}
         maxValue={maxPriceSlider || 500}
         ruler={false}
         label={false}
         onChange={(e) => handleSliderInput(e)}
         baseClassName="filters__filter--range-slider"
        />
       </div>
       <div className="filters__filter--values-container">
        <div
         className={`filters__filter--field ${
          minPrice > maxPrice && "incorrect"
         }`}
        >
         <span>$</span>
         <input
          min={0}
          max={maxPrice || 500}
          maxLength={3}
          type="number"
          value={minPrice !== null ? minPrice : ""}
          onChange={(e) => handleMinPriceChange(e)}
         />
        </div>
        <span>to</span>
        <div
         className={`filters__filter--field ${
          minPrice > maxPrice && "incorrect"
         }`}
        >
         <span>$</span>
         <input
          min={minPrice || 0}
          max={500}
          maxLength={3}
          type="number"
          value={maxPrice !== null ? maxPrice : ""}
          onChange={(e) => handleMaxPriceChange(e)}
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
