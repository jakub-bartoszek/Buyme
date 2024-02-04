import { Link } from "react-router-dom";
import { Product } from "../../App";
import "./Tile.scss";

interface TileProps {
 product?: Product;
 loading?: boolean;
}

const Tile: React.FC<TileProps> = ({ product, loading }) => {
 if (!product) {
  return (
   <div className={`tile ${loading && "loading"}`}>
    <div className="tile__image-wrapper">
     <div className="tile__image" />
    </div>
    <p className="tile__name"></p>
    <p className="tile__price"></p>
   </div>
  );
 }

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
