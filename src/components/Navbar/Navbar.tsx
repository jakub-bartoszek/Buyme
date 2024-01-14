import "./styles.scss";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/cartSlice";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
 const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
 const searchSwitchRef = useRef<HTMLDivElement>(null);
 const searchInputRef = useRef<HTMLInputElement>(null);
 const navigate = useNavigate();
 const cart = useSelector(selectCart);

 const toggleSearchInput = () => {
  setShowSearchInput(!showSearchInput);
 };

 const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  navigate("/search");
  setShowSearchInput(false);
 };

 useEffect(() => {
  if (showSearchInput && searchInputRef.current) {
   searchInputRef.current.focus();
  }
 }, [showSearchInput]);

 return (
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
       className="navbar__menu--searchInput"
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
     </NavLink>
     <NavLink
      className="navbar__menu--button"
      to="/cart"
     >
      <ShoppingCartIcon className="cart-icon" />
      {cart.length > 0 && <div className="cart-item-count">{cart.length}</div>}
     </NavLink>
    </div>
    {showSearchInput && (
     <div
      className="navbar__shadow"
      onClick={toggleSearchInput}
     />
    )}
   </div>
  </nav>
 );
};

export default Navbar;
