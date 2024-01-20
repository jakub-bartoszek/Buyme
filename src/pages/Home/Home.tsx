import React from "react";
import "./styles.scss";
import Tile from "../../components/Tile/Tile";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/productsSlice";
import { Product } from "../../App";

const Home: React.FC = () => {
 // Retrieve products from the Redux store
 const products: Product[] = useSelector(selectProducts);

 return (
  <div>
   {/* Banner Section */}
   <header className="banner">
    <img
     src="https://pbs.twimg.com/media/Fzb3Zq9aMAIRwex?format=jpg&name=large"
     alt="Banner"
    />
   </header>
   {/* Main Content */}
   <main className="main">
    {/* Newest Section */}
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
    {/* Most Popular Section */}
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
    {/* Winter Collection Section */}
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
  </div>
 );
};

export default Home;
