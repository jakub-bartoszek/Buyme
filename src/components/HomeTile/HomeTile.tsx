import { Link } from "react-router-dom";
import { useState } from "react";
import { Product } from "../../App";
import "./HomeTile.scss";

interface HomeTileProps {
 product: Product;
}

const HomeTile: React.FC<HomeTileProps> = ({ product }) => {
 const [currentImage, setCurrentImage] = useState(
  product.images && (product.images[1] ? product.images[1] : product.images[0])
 );
 let timeoutId: number | undefined;

 const handleMouseOver = () => {
  if (product.images && product.images.length !== 1) {
   timeoutId = setTimeout(() => setCurrentImage(product.images && product.images[0]), 250);
  }
 };

 const handleMouseOut = () => {
  clearTimeout(timeoutId);
  if (product.images && product.images.length > 1) {
   setCurrentImage(product.images && product.images[1]);
  }
 };

 return (
  <Link
   to={`/product/${product.id}`}
   className="home-section__product-tile"
  >
   <div className="home-section__product-tile-image-wrapper">
    <img
     className="home-section__product-tile-image"
     src={currentImage}
     onMouseOver={handleMouseOver}
     onMouseOut={handleMouseOut}
    />
   </div>
   <p>{product.name}</p>
   <p>{product.price}$</p>
  </Link>
 );
};

export default HomeTile;
