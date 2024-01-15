import { Link } from "react-router-dom";
import { Product } from "../../App";
import "./styles.scss";

interface TileProps {
 product: Product;
}

const Tile: React.FC<TileProps> = ({ product }) => {
 return (
  <Link
   to={`/product/${product.id}`}
   className="tile"
  >
   <div className="tile__image-wrapper">
    {product.images && (
     <img
      className="tile__image"
      src={product.images[0]}
     />
    )}
   </div>
   <p className="tile__name">{product.name}</p>
   <p className="tile__price">{product.price}$</p>
  </Link>
 );
};

export default Tile;
