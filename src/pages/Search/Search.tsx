import "./styles.scss";
import "./multirangeslider.css";
import { useSearchParams } from "react-router-dom";
import { Product } from "../../App";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productsSlice";
import Tile from "../../components/Tile/Tile";
import { useState, useEffect } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

const Search: React.FC = () => {
 const [searchParams, setSearchParams] = useSearchParams();
 const query = searchParams.get("q");
 const minPriceParam = parseInt(searchParams.get("minPrice") || "", 10);
 const maxPriceParam = parseInt(searchParams.get("maxPrice") || "", 10);

 const products: Product[] = useSelector(selectProducts);

 const [minPrice, setMinPrice] = useState<number | null>(null);
 const [maxPrice, setMaxPrice] = useState<number | null>(null);

 useEffect(() => {
  if (!searchParams.has("minPrice")) setMinPrice(null);
  if (!searchParams.has("maxPrice")) setMaxPrice(null);

  setMinPrice(minPriceParam);
  setMaxPrice(maxPriceParam);
 }, [searchParams, minPriceParam, maxPriceParam]);

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
  setMinPrice(e.minValue);
  setMaxPrice(e.maxValue);
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
     <div className="filters__price">
      Price
      <MultiRangeSlider
       min={0}
       max={500}
       step={5}
       minValue={minPrice ? minPrice : 0}
       maxValue={maxPrice ? maxPrice : 500}
       ruler={false}
       label={false}
       onInput={(e) => handleInput(e)}
       baseClassName="filters__price--range-slider"
      />
     </div>
     <div className="filters__price--values-container">
      <div className="filters__price--field">
       <span>$</span>
       <input
        min={0}
        max={maxPrice ? maxPrice : 500}
        type="number"
        value={minPrice !== null ? minPrice : ""}
        onChange={(e) => setMinPrice(parseInt(e.target.value, 10))}
       />
      </div>
      <span>to</span>
      <div className="filters__price--field">
       <span>$</span>
       <input
        min={minPrice ? minPrice : 0}
        max={500}
        type="number"
        value={maxPrice !== null ? maxPrice : ""}
        onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
       />
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
