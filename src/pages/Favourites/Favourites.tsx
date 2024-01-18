import { useSelector } from "react-redux";
import { selectFavourites } from "../../redux/favouritesSlice";
import { Product } from "../../App";
import { selectProducts } from "../../redux/productsSlice";
import "./styles.scss";

export interface FavouriteItem {
 id: number;
}

const Favourites: React.FC = () => {
 const favorites = useSelector(selectFavourites);
 const products: Product[] = useSelector(selectProducts);
 return (
  <div className="favourites">
   {favorites.length > 0 ? (
    <>
     {favorites.map((item: FavouriteItem) =>
      products
       .filter((product) => product.id === item.id)
       .map((product) => (
        <div className="favourites-tile">
         <div className="favourites-tile__image-wrapper">
          {product && product.images && <img src={product.images[0]} />}
         </div>
         <div>
          <p>{product.name}</p>
          <p>{product.price}</p>
         </div>
        </div>
       ))
     )}
    </>
   ) : (
    <div className="no-favourites-message">
     You don't have favourite products
    </div>
   )}
  </div>
 );
};

export default Favourites;
