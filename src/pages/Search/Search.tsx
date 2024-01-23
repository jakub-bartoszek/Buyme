import "./styles.scss";
import { useSearchParams } from "react-router-dom";
import { Product } from "../../App";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productsSlice";
import Tile from "../../components/Tile/Tile";

const Search: React.FC = () => {
 const [searchParams] = useSearchParams();
 const query = searchParams.get("q");
 const products: Product[] = useSelector(selectProducts);

 const filteredProducts = query
  ? products.filter((product) =>
     product?.name.toLowerCase().includes(query.toLowerCase())
    )
  : products;

 return (
  <div className="search">
   <header className="filters"></header>
   <main className="main">
    <h2 className="query">Search results for "{query}"</h2>
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
