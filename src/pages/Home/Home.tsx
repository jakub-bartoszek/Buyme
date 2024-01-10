import "./styles.scss";
import Tile from "../../components/Tile/Tile";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productsSlice";
import { Product } from "../../App";

export default function Home() {
 const products: Product[] = useSelector(selectProducts);

 if (!products) {
  return <div>Loading...</div>;
 }

 return (
  <div>
   <header className="banner">
    <img src="https://pbs.twimg.com/media/Fzb3Zq9aMAIRwex?format=jpg&name=large" />
   </header>
   <main className="main">
    <h2 className="title">Newest</h2>
    <section
     className="section"
     id="newest"
    >
     {products
      .filter((product) => product?.date_added.includes("2024"))
      .map((product) => (
       <Tile
        key={product.id}
        product={product}
       />
      ))}
    </section>
    <h2 className="title">Most popular</h2>
    <section
     className="section"
     id="most_popular"
    >
     {products
      .filter((product) => product?.popularity > 80)
      .map((product) => (
       <Tile
        key={product.id}
        product={product}
       />
      ))}
    </section>
    <h2 className="title">Winter collection</h2>
    <section
     className="section"
     id="winter_collection"
    >
     {products
      .filter((product) => product?.categories?.includes("winter"))
      .map((product) => (
       <Tile
        key={product.id}
        product={product}
       />
      ))}
    </section>
   </main>
  </div>
 );
}
