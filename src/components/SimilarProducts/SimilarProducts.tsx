import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import HomeTile from "../../components/HomeTile/HomeTile";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../App";

interface SimilarProductsProps {
 product: Product;
 products: Product[];
 category: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ product, products, category }) => {
 const scrollRef = useRef<HTMLDivElement | null>(null);
 const [areArrowsHidden, setAreArrowsHidden] = useState(false);

 const arrowButtonClickHandler = (direction: string) => {
  if (scrollRef.current) {
   if (direction === "left") {
    scrollRef.current.scrollLeft -= 800;
   } else {
    scrollRef.current.scrollLeft += 800;
   }
  }
 };

 const onScrollHandler = () => {
  if (scrollRef.current) {
   const isScrollable = scrollRef.current.scrollWidth > scrollRef.current.clientWidth;

   if (isScrollable) {
    console.log("is scrollable");
    setAreArrowsHidden(false);
   } else {
    console.log("isnt scrollable");
    setAreArrowsHidden(true);
   }
  }
 };

 useEffect(() => {
  onScrollHandler();
 }, []);

 return (
  <div className="product__similar-products-wrapper">
   <div
    onClick={() => arrowButtonClickHandler("left")}
    className={`product__left-arrow-button ${areArrowsHidden && "hidden"}`}
   >
    <ArrowLeftIcon />
   </div>
   <div
    onClick={() => arrowButtonClickHandler("right")}
    className={`product__right-arrow-button ${areArrowsHidden && "hidden"}`}
   >
    <ArrowRightIcon />
   </div>
   <div
    onScroll={onScrollHandler}
    ref={scrollRef}
    className="product__similar-products-list"
   >
    {products
     .filter((p) => p.categories.includes(category))
     .filter((p) => p.name !== product.name)
     .map((product) => (
      <HomeTile
       key={product.id}
       product={product}
      />
     ))}
   </div>
  </div>
 );
};

export default SimilarProducts;
