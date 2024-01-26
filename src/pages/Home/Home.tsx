import React from "react";
import "./styles.scss";
import Tile from "../../components/Tile/Tile";
import { useSelector } from "react-redux";
import { selectProducts } from "../../utils/redux/productsSlice";
import { Product } from "../../App";

const Home: React.FC = () => {
 const products: Product[] = useSelector(selectProducts);

 return (
  <div className="home">
   <header className="banner">
    <img
     src="https://pbs.twimg.com/media/Fzb3Zq9aMAIRwex?format=jpg&name=large"
     alt="Banner"
    />
   </header>
   {products.length > 0 ? (
    <main className="main">
     <h2 className="section-title">Newest</h2>
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
     <h2 className="section-title">Most popular</h2>
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
     <h2 className="section-title">Winter collection</h2>
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
   ) : (
    <main className="main">
     <h2 className="section-title">Loading...</h2>
     <section
      className="section"
      id="newest"
     >
      {[...Array(21).keys()].map(() => (
       <Tile loading={true} />
      ))}
     </section>
    </main>
   )}
  </div>
 );
};

export default Home;
