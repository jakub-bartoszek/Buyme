import { useEffect, useState } from "react";
import "./styles.scss";
import Tile from "../../components/Tile/Tile";

export interface Product {
 id: number;
 name: string;
 categories: Array<string>;
 price: number;
 date_added: string;
 available_sizes: Array<string>;
 description: string;
 image?: string;
 popularity: number;
 rating: number;
 number_of_bought: number;
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
