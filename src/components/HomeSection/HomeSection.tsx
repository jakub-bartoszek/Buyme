import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Product } from "../../App";
import "./HomeSection.scss";
import { useRef } from "react";

const HomeTile = ({ product }: { product: Product }) => (
 <div className="home-section__product-tile">
  <div className="home-section__product-tile-image">
   <img src={product.images && product.images[0]}></img>
  </div>
  <p>{product.name}</p>
  <p>{product.price}</p>
 </div>
);

const HomeSection = ({
 name,
 products,
 image
}: {
 name: string;
 products: Product[];
 image: string;
}) => {
 const scrollRef = useRef<HTMLDivElement>(null);

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
   <div className="home-section__header">{name.toUpperCase()}</div>
   <div className="home-section__banner">
    <div className="home-section__image">
     <img src={image} />
    </div>
    <div className="home-section__button">
     <span>GO TO COLLECTION</span>
     <div className="home-section__right-arrow-icon">
      <ArrowRightIcon />
     </div>
    </div>
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
     {products.map((product) => (
      <HomeTile product={product} />
     ))}
    </div>
   </div>
  </section>
 );
};

export default HomeSection;
