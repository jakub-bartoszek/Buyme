import { useEffect, useState } from "react";
import "./styles.scss";
import Tile from "../../components/Tile/Tile";

export interface Product {
 name: string;
 category: string;
 price: number;
 date_added: string;
 available_sizes: Array<string>;
 description: string;
 image?: string;
}

export default function Home() {
 const [products, setProducts] = useState<Product[]>([]);

 const fetchProducts = async () => {
  try {
   const response = await fetch("./products.json", {
    headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
    }
   });
   const fetchedProducts = await response.json();
   setProducts(fetchedProducts);
  } catch (error) {
   console.error("Error fetching products:", error);
  }
 };

 useEffect(() => {
  fetchProducts();
 }, []);

 if (!products) {
  return <div>Loading...</div>;
 }

 return (
  <div>
   <header className="banner"></header>
   <main className="main">
    <h2 className="title">Newest</h2>
    <section
     className="section"
     id="newest"
    >
     {products.map((product) => (
      <Tile product={product} />
     ))}
    </section>
    <h2 className="title">Most popular</h2>
    <section
     className="section"
     id="most_popular"
    >
     {products.map((product) => (
      <Tile product={product} />
     ))}
    </section>
    <h2 className="title">Winter collection</h2>
    <section
     className="section"
     id="winter_collection"
    >
     {products.map((product) => (
      <Tile product={product} />
     ))}
    </section>
   </main>
  </div>
 );
}
