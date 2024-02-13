import React from "react";
import "./Home.scss";
import { useSelector } from "react-redux";
import { selectProducts } from "../../utils/redux/productsSlice";
import { Product } from "../../App";
import HomeSection from "../../components/HomeSection/HomeSection";

const Home: React.FC = () => {
 const products: Product[] = useSelector(selectProducts);

 return (
  <main className="home">
   <header className="home__banner" />
   <HomeSection
    name="newest"
    products={products.filter((product) => product.date_added.includes("2024"))}
    image="./images/newest-collection-banner.jpg"
   />
   <HomeSection
    name="most popular"
    products={products.filter((product) => product.popularity > 80)}
    image="./images/most-popular-collection-banner.jpg"
   />
   <HomeSection
    name="winter collection"
    products={products.filter((product) => product.categories.includes("winter"))}
    image="./images/winter-collection-banner.jpg"
   />
  </main>
 );
};

export default Home;
