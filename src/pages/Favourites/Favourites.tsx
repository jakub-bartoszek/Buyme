import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites, selectFavourites } from "../../redux/favouritesSlice";
import { Product } from "../../App";
import { selectProducts } from "../../redux/productsSlice";
import "./styles.scss";
import { HeartIcon } from "@heroicons/react/24/solid";

export interface FavouriteItem {
 id: number;
}

const Favourites: React.FC = () => {
 const favorites = useSelector(selectFavourites);
 const products: Product[] = useSelector(selectProducts);
 const dispatch = useDispatch();

 return (
  <div className="favourites">
   {favorites.length > 0 ? (
    <>
     {favorites.map((item: FavouriteItem) =>
      products
       .filter((product) => product.id === item.id)
       .map((product) => (
        <div
         className="favourites-tile"
         key={product.id}
        >
         <div className="favourites-tile__image-wrapper">
          {product && product.images && (
           <img
            src={product.images[0]}
            alt={product.name}
           />
          )}
         </div>
         <div>
          <p className="favourites-tile__name">{product.name}</p>
          <p className="favourites-tile__price">{product.price} $</p>
         </div>
         <button
          className="favourites-tile__favourite-button"
          onClick={() => dispatch(addToFavourites({ id: product.id }))}
         >
          <HeartIcon />
         </button>
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
