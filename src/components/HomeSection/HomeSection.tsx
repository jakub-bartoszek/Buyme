import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Product } from "../../App";
import "./HomeSection.scss";
import { useRef } from "react";
import HomeTile from "../HomeTile/HomeTile";

interface HomeSectionProps {
 name: string;
 products: Product[];
 image: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ name, products, image }) => {
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
