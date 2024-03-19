import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Collection, Product } from "../../App";
import "./HomeSection.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../utils/redux/productsSlice";
import { selectCollections } from "../../utils/redux/collectionsSlice";
import ScrollableProductList from "../ScrollableProductList/ScrollableProductList";

interface HomeSectionProps {
 name: string;
 image: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ name, image }) => {
 const products = useSelector(selectProducts);
 const collections: Collection[] = useSelector(selectCollections);
 const collection = collections.find((c) => c.name === name);
 let filteredProducts: Product[] = [];

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
  <section
   id={name.replace(" ", "-")}
   className="home-section"
  >
   <h2 className="home-section__header">{name.toUpperCase()}</h2>
   <div className="home-section__banner">
    <div className="home-section__image">
     <img src={image} />
    </div>
    <Link
     to={`/collection/${name}`}
     className="home-section__link"
    >
     <span>GO TO COLLECTION</span>
     <div className="home-section__right-arrow-icon">
      <ArrowRightIcon />
     </div>
    </Link>
   </div>
   <ScrollableProductList products={filteredProducts} />
  </section>
 );
};

export default HomeSection;
