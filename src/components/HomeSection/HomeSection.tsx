import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Collection, Product } from "../../App";
import "./HomeSection.scss";
import { useRef } from "react";
import HomeTile from "../HomeTile/HomeTile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../utils/redux/productsSlice";
import { selectCollections } from "../../utils/redux/collectionsSlice";

interface HomeSectionProps {
 name: string;
 image: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ name, image }) => {
 const products = useSelector(selectProducts);
 const collections: Collection[] = useSelector(selectCollections);
 const collection = collections.find((c) => c.name === name);
 let filteredProducts: Product[] = [];

 const scrollRef = useRef<HTMLDivElement>(null);

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

 const ArrowButtonClickHandler = (direction: string) => {
  if (scrollRef.current) {
   if (direction === "left") {
    scrollRef.current.scrollLeft -= 800;
   } else {
    scrollRef.current.scrollLeft += 800;
   }
  }
 };

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
   <div className="home-section__products-wrapper">
    <div
     onClick={() => ArrowButtonClickHandler("left")}
     className="home-section__left-arrow-button"
    >
     <ArrowLeftIcon />
    </div>
    <div
     onClick={() => ArrowButtonClickHandler("right")}
     className="home-section__right-arrow-button"
    >
     <ArrowRightIcon />
    </div>
    <div
     ref={scrollRef && scrollRef}
     className="home-section__products"
    >
     {filteredProducts.map((product) => (
      <HomeTile
       key={product.id}
       product={product}
      />
     ))}
    </div>
   </div>
  </section>
 );
};

export default HomeSection;
