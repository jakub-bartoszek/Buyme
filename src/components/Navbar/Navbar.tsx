import "./styles.scss";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/cartSlice";
import { selectFavourites } from "../../redux/favouritesSlice";

const Navbar: React.FC = () => {
 const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
 const searchSwitchRef = useRef<HTMLDivElement>(null);
 const searchInputRef = useRef<HTMLInputElement>(null);
 const navigate = useNavigate();
 const cart = useSelector(selectCart);
 const favourites = useSelector(selectFavourites);

 const toggleSearchInput = () => {
  setShowSearchInput(!showSearchInput);
 };

 const onFormSubmit = useCallback(
  (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   navigate("/search");
   setShowSearchInput(false);
  },
  [navigate]
 );

 useEffect(() => {
  if (showSearchInput && searchInputRef.current) {
   searchInputRef.current.focus();
  }
 }, [showSearchInput]);

 return (
  <>
   {showSearchInput && (
    <div
     className="navbar__shadow"
     onClick={toggleSearchInput}
    />
   )}
   <nav className="navbar">
    <div className="navbar__content">
     <div className="navbar__logo-wrapper">
      <Bars3Icon className="navbar__bars" />
      <NavLink
       to="/"
       className="navbar__logo"
      >
       <h1>BuyMe!</h1>
      </NavLink>
     </div>
     {showSearchInput ? (
      <form
       className="navbar__menu--form"
       onSubmit={onFormSubmit}
      >
       <input
        className="navbar__menu--search-input"
        type="text"
        placeholder="Search"
        ref={searchInputRef}
       />
      </form>
     ) : (
      <div className="navbar__menu--links">
       <NavLink to="/home">Home</NavLink>
       <NavLink to="/shop">Shop</NavLink>
       <NavLink to="/about">About</NavLink>
       <NavLink to="/contact">Contact</NavLink>
      </div>
     )}
     <div className="navbar__menu--buttons">
      <div
       className="navbar__menu--button"
       ref={searchSwitchRef}
       onClick={toggleSearchInput}
      >
       {showSearchInput ? <XMarkIcon /> : <MagnifyingGlassIcon />}
      </div>
      <NavLink
       className="navbar__menu--button"
       to="/favourites"
      >
       <HeartIcon />
       {favourites.length > 0 && (
        <div className="item-count">{favourites.length}</div>
       )}
      </NavLink>
      <NavLink
       className="navbar__menu--button"
       to="/cart"
      >
       <ShoppingCartIcon />
       {cart.length > 0 && <div className="item-count">{cart.length}</div>}
      </NavLink>
     </div>
    </div>
   </nav>
  </>
 );
};

export default Navbar;
