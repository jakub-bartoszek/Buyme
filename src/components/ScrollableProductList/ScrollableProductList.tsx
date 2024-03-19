import React, { useRef, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import "./ScrollableProductList.scss";
import { Product } from "../../App";
import Tile from "../Tile/Tile";

interface ScrollableProductListProps {
 products: Product[];
 category?: string;
 product?: Product;
}

const ScrollableProductList: React.FC<ScrollableProductListProps> = ({
 products,
 category,
 product
}) => {
 const scrollRef = useRef<HTMLDivElement>(null);
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
   setAreArrowsHidden(!isScrollable);
  }
 };

 useEffect(() => {
  onScrollHandler();
 }, []);

 return (
  <div className="scrollable-product-list">
   <div
    onClick={() => arrowButtonClickHandler("left")}
    className={`scrollable-product-list__left-arrow-button ${areArrowsHidden && "hidden"}`}
   >
    <ArrowLeftIcon />
   </div>
   <div
    onClick={() => arrowButtonClickHandler("right")}
    className={`scrollable-product-list__right-arrow-button ${areArrowsHidden && "hidden"}`}
   >
    <ArrowRightIcon />
   </div>
   <div
    onScroll={onScrollHandler}
    ref={scrollRef}
    className="scrollable-product-list__products"
   >
    {products
     .filter((p) => !category || p.categories.includes(category))
     .filter((p) => (product ? product.name !== p.name : p))
     .map((product) => (
      <Tile
       key={product.id}
       product={product}
      />
     ))}
   </div>
  </div>
 );
};

export default ScrollableProductList;
