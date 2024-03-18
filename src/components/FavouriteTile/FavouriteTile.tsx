import { Link } from "react-router-dom";
import { Product } from "../../App";
import "./FavouriteTile.scss";
import { TrashIcon } from "@heroicons/react/24/outline";
import { addToFavourites } from "../../utils/redux/favouritesSlice";
import { useDispatch } from "react-redux";

interface FavouriteTileProps {
 product: Product;
}

const FavouriteTile: React.FC<FavouriteTileProps> = ({ product }) => {
 const dispatch = useDispatch();

 const handleRemoveButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();
  dispatch(addToFavourites({ id: product.id }));
 };

 return (
  <Link
   to={`/product/${product.id}`}
   className="favourite-tile"
  >
   <div className="favourite-tile__image">
    {product.images && <img src={product.images[0]} />}
    <button
     className="favourite-tile__remove-button"
     onClick={handleRemoveButtonClick}
    >
     <TrashIcon />
    </button>
   </div>
   <p>{product.name}</p>
   <p>{product.price}$</p>
  </Link>
 );
};

export default FavouriteTile;
