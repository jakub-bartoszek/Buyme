import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

import Tile from "../../components/Tile/Tile";
import { selectProducts } from "../../utils/redux/productsSlice";
import { Product } from "../../App";
import "./styles.scss";
import "./multirangeslider.scss";

const Search: React.FC = () => {
 const [searchParams, setSearchParams] = useSearchParams();
 const query = searchParams.get("q");
 const minPriceParam = parseInt(searchParams.get("minPrice") || "", 10);
 const maxPriceParam = parseInt(searchParams.get("maxPrice") || "", 10);
 const categoriesParam = (searchParams.get("categories") || "").split(",");
 const products: Product[] = useSelector(selectProducts);

 const [minPrice, setMinPrice] = useState<number>(0);
 const [maxPrice, setMaxPrice] = useState<number>(500);
 const [minPriceSlider, setMinPriceSlider] = useState<number>(0);
 const [maxPriceSlider, setMaxPriceSlider] = useState<number>(500);
 const [categories, setCategories] = useState<string[]>([]);

 const [filterStates, setFilterStates] = useState({
  price: { visible: true },
  categories: { visible: false }
 });

 const allCategories = Array.from(new Set(products.flatMap((product) => product.categories)));

 // Set initial price values based on search parameters
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

 // Set initial category values based on search parameters
 useEffect(() => {
  if (searchParams.has("categories")) {
   setCategories((searchParams.get("categories") || "").split(","));
  } else {
   setCategories([]);
  }
 }, [searchParams]);

 // Handle filter toggle
 const handleFilterToggle = (filterType: keyof typeof filterStates) => {
  setFilterStates((prevStates) => ({
   ...prevStates,
   [filterType]: {
    ...prevStates[filterType],
    visible: !prevStates[filterType].visible
   }
  }));
 };

 // Handle form submission
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (minPrice < maxPrice) {
   const newSearchParams = new URLSearchParams(searchParams);

   if (minPrice) newSearchParams.set("minPrice", minPrice.toString());
   else newSearchParams.delete("minPrice");

   if (maxPrice) newSearchParams.set("maxPrice", maxPrice.toString());
   else newSearchParams.delete("maxPrice");

   if (categories.length > 0) {
    newSearchParams.set("categories", categories.join(","));
   } else {
    newSearchParams.delete("categories");
   }

   setSearchParams(newSearchParams);
  }
 };

 // Handle slider input
 const handleSliderInput = (e: ChangeResult) => {
  setMinPrice(e.minValue);
  setMaxPrice(e.maxValue);
  if (e.minValue <= e.maxValue) {
   setMinPriceSlider(e.minValue);
   setMaxPriceSlider(e.maxValue);
  }
 };

 // Handle min price change
 const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value)) {
   if (maxPrice < 20) {
    setMaxPrice(20);
    setMaxPriceSlider(20);
    setMinPrice(0);
    setMinPriceSlider(0);
   } else {
    setMinPrice(value <= maxPrice - 20 ? Math.max(0, value) : maxPrice - 20);
    setMinPriceSlider(
     Math.min(value <= maxPrice - 20 ? Math.max(0, value) : maxPrice - 20, maxPrice)
    );
   }
  }
 };

 // Handle max price change
 const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value)) {
   setMaxPrice(Math.max(0, Math.min(value, 500)));
   setMaxPriceSlider(Math.max(value, minPrice));
  }
 };

 // Handle category change
 const handleCategoryChange = (category: string) => {
  setCategories((prevCategories) => {
   if (prevCategories.includes(category)) {
    return prevCategories.filter((c) => c !== category);
   } else {
    return [...prevCategories, category];
   }
  });
 };

 // Filter products based on search query and applied filters
 const filteredProducts = query
 ? products.filter(
     (product) =>
       product?.name.toLowerCase().includes(query.toLowerCase()) &&
       (minPriceParam ? product?.price > minPriceParam : true) &&
       (maxPriceParam ? product?.price < maxPriceParam : true) &&
       ((categoriesParam.length === 0 || categoriesParam[0] === "") ||
         product?.categories.some((cat) => categoriesParam.includes(cat)))
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
     <div className={`filters__filter ${filterStates.price.visible ? "shown" : ""}`}>
      <div className="filters__filter--header">
       <span>Price</span>
       <div
        className={`filters__filter--show-icon ${filterStates.price.visible ? "rotated" : ""}`}
        onClick={() => handleFilterToggle("price")}
       >
        <ChevronDownIcon />
       </div>
      </div>
      <div className={`filters__filter--content ${filterStates.price.visible ? "shown" : ""}`}>
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
        <div className={`filters__filter--field ${minPrice > maxPrice && "incorrect"}`}>
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
        <div className={`filters__filter--field ${minPrice > maxPrice && "incorrect"}`}>
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
     <div className={`filters__filter ${filterStates.categories.visible ? "shown" : ""}`}>
      <div className="filters__filter--header">
       <span>Categories</span>
       <div
        className={`filters__filter--show-icon ${filterStates.categories.visible ? "rotated" : ""}`}
        onClick={() => handleFilterToggle("categories")}
       >
        <ChevronDownIcon />
       </div>
      </div>
      <div className={`filters__filter--content ${filterStates.categories.visible ? "shown" : ""}`}>
       <ul className="filters__category-list">
        {allCategories.map((category) => (
         <li
          key={category}
          className="filters__category-item"
         >
          <input
           type="checkbox"
           id={category}
           className="filters__category-checkbox"
           checked={categories.includes(category)}
           onChange={() => handleCategoryChange(category)}
          />
          <label
           htmlFor={category}
           className="filters__category-label"
          >
           {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
         </li>
        ))}
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
