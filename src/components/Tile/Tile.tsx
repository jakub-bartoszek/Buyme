import { Link } from "react-router-dom";
import { useState } from "react";
import { Product } from "../../App";
import "./Tile.scss";

interface TileProps {
 product: Product;
}

const Tile: React.FC<TileProps> = ({ product }) => {
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
   className="product-tile"
  >
   <div className="product-tile__image-wrapper">
    <img
     src={currentImage}
     onMouseOver={handleMouseOver}
     onMouseOut={handleMouseOut}
    />
   </div>
   <div>
    <p>{product.name}</p>
    <p>{product.price}$</p>
   </div>
  </Link>
 );
};

export default Tile;
