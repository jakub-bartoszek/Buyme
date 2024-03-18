import { useParams } from "react-router-dom";
import "./CollectionPage.scss";
import HomeTile from "../../components/HomeTile/HomeTile";
import { Collection, Product } from "../../App";
import { useSelector } from "react-redux";
import { selectProducts } from "../../utils/redux/productsSlice";
import { selectCollections } from "../../utils/redux/collectionsSlice";
import { useEffect } from "react";

const CollectionPage = () => {
 const { name } = useParams();
 const products = useSelector(selectProducts);
 const collections: Collection[] = useSelector(selectCollections);
 const collection = collections.find((c) => c.name === name);
 let filteredProducts: Product[] = [];

 useEffect(() => {
  window.scrollTo({
   top: 0
  });
 }, []);

 if (collection) {
  switch (collection.name) {
   case "newest":
    filteredProducts = products.filter((product) => product.date_added.includes("2024"));
    break;
   case "most popular":
    filteredProducts = products.filter((product) => product.popularity > 80);
    break;
   case "winter collection":
    filteredProducts = products.filter((product) => product.categories.includes("winter"));
    break;
   default:
    filteredProducts = [];
    break;
  }
 }

 return (
  <main className="collection">
   <header className="collection__banner">
    {collection && collection.image && <img src={collection.image} />}
   </header>
   <div className="collection__products">
    {filteredProducts &&
     filteredProducts.map((product) => (
      <HomeTile
       key={product.id}
       product={product}
      />
     ))}
   </div>
  </main>
 );
};

export default CollectionPage;
