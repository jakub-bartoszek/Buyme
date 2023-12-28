import "./styles.scss";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";

export const Navbar = () => (
 <nav className="navbar">
  <div className="navbar__content">
   <div className="navbar__logoWrapper">
    <Bars3Icon className="navbar__bars" />
    <a className="navbar__logo">
     <h1>BuyMe!</h1>
    </a>
   </div>
   <input></input>
   <div className="navbar__menu">
    <a
     href=""
     className="navbar__menu--link"
    >
     Home
    </a>
    <a
     href=""
     className="navbar__menu--link"
    >
     Shop
    </a>
    <a
     href=""
     className="navbar__menu--link"
    >
     About
    </a>
    <a
     href=""
     className="navbar__menu--link"
    >
     Contact
    </a>
    <a
     href=""
     className="navbar__menu--link"
    >
     <HeartIcon />
    </a>
    <a
     href=""
     className="navbar__menu--link"
    >
     <ShoppingCartIcon />
    </a>
   </div>
  </div>
 </nav>
);
