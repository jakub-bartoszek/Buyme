import { Product } from "../../pages/Home/Home";
import "./styles.scss";

interface TileProps {
 product: Product;
}

const Tile: React.FC<TileProps> = ({ product }) => {
 return (
  <div className="tile">
   <div className="tile__imageWrapper">
    <img
     className="tile__image"
     src={product.image}
    />
   </div>
   <p className="tile__name">{product.name}</p>
   <p className="tile__price">{product.price}$</p>
  </div>
 );
};

export default Tile;
