import "./styles.scss";
import { useSearchParams } from "react-router-dom";
import { Product } from "../../App";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productsSlice";
import Tile from "../../components/Tile/Tile";
import { useState, useEffect } from "react";

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

 const filteredProducts = query
  ? products.filter(
     (product) =>
      product?.name.toLowerCase().includes(query.toLowerCase()) &&
      (minPriceParam ? product?.price > minPriceParam : true) &&
      (maxPriceParam ? product?.price < maxPriceParam : true)
    )
  : products;

 return (
  <div className="search">
   <main className="main">
    <h2 className="query">Search results for "{query}"</h2>
    <form
     className="filters"
     onSubmit={handleSubmit}
    >
     <div>
      Price from &nbsp;
      <input
       className="filters__field"
       type="number"
       value={minPrice || ""}
       onChange={(e) => setMinPrice(parseInt(e.target.value, 10))}
      />
      &nbsp;to&nbsp;
      <input
       className="filters__field"
       type="number"
       value={maxPrice || ""}
       onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
      />
     </div>
     <button className="filters__submit-button">Apply</button>
    </form>
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
  </div>
 );
};

export default Search;
