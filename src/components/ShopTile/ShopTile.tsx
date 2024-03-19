import { Link } from "react-router-dom";
import { Product } from "../../App";
import "./ShopTile.scss";

interface ShopTileProps {
 product?: Product;
}

const ShopTile: React.FC<ShopTileProps> = ({ product }) => {
 if (product)
  return (
   <Link
    to={`/product/${product.id}`}
    className="shop-tile"
   >
    <div className="shop-tile__image-wrapper">
     {product.images && (
      <img
       className="shop-tile__image"
       src={product.images[0]}
      />
     )}
    </div>
    <p className="shop-tile__name">{product.name}</p>
    <p className="shop-tile__price">{product.price}$</p>
   </Link>
  );
};

export default ShopTile;
