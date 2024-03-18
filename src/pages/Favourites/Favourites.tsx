import React from "react";
import { useSelector } from "react-redux";
import { selectFavourites } from "../../utils/redux/favouritesSlice";
import { Product } from "../../App";
import { selectProducts } from "../../utils/redux/productsSlice";
import "./Favourites.scss";
import { HeartIcon } from "@heroicons/react/24/solid";
import FavouriteTile from "../../components/FavouriteTile/FavouriteTile";

export interface FavouriteItem {
 id: number;
}

const Favourites: React.FC = () => {
 const favorites = useSelector(selectFavourites);
 const products: Product[] = useSelector(selectProducts);

 return (
  <div className="favourites">
   {favorites.length > 0 ? (
    <div className="favourites__products">
     {favorites.map((item: FavouriteItem) =>
      products
       .filter((product) => product.id === item.id)
       .map((product) => (
        <FavouriteTile
         key={product.id}
         product={product}
        />
       ))
     )}
    </div>
   ) : (
    <div className="no-favourites-message">
     <HeartIcon />
     You don't have favourite products
    </div>
   )}
  </div>
 );
};

export default Favourites;
