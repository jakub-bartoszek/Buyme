import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourites, selectFavourites } from "../../redux/favouritesSlice";
import { Product } from "../../App";
import { selectProducts } from "../../redux/productsSlice";
import "./styles.scss";
import { HeartIcon } from "@heroicons/react/24/solid";

// Define the interface for a favorite item
export interface FavouriteItem {
 id: number;
}

const Favourites: React.FC = () => {
 // Redux hooks to access state and dispatch actions
 const favorites = useSelector(selectFavourites);
 const products: Product[] = useSelector(selectProducts);
 const dispatch = useDispatch();

 return (
  <div className="favourites">
   {favorites.length > 0 ? (
    // Display favorite products if there are any
    <>
     {favorites.map((item: FavouriteItem) =>
      products
       .filter((product) => product.id === item.id)
       .map((product) => (
        <div
         className="favourites-tile"
         key={product.id}
        >
         {/* Display product image */}
         <div className="favourites-tile__image-wrapper">
          {product && product.images && (
           <img
            src={product.images[0]}
            alt={product.name}
           />
          )}
         </div>
         <div>
          {/* Display product name */}
          <p className="favourites-tile__name">{product.name}</p>
          {/* Display product price */}
          <p className="favourites-tile__price">{product.price}</p>
         </div>
         {/* Add to favorites button */}
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
    // Display message when there are no favorite products
    <div className="no-favourites-message">
     You don't have favourite products
    </div>
   )}
  </div>
 );
};

export default Favourites;
