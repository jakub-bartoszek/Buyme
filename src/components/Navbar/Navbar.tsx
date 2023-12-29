import "./styles.scss";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
 return (
  <nav className="navbar">
   <div className="navbar__content">
    <div className="navbar__logoWrapper">
     <Bars3Icon className="navbar__bars" />
     <a
      href="/"
      className="navbar__logo"
     >
      <h1>BuyMe!</h1>
     </a>
    </div>
    <input
     className="navbar__menu--searchInput"
     type="text"
     placeholder="Search"
    />
    <div className="navbar__menu--links">
     {["Home", "Shop", "About", "Contact"].map((link, index) => (
      <a
       key={index}
       href="/"
       className="navbar__menu--link"
      >
       {link}
      </a>
     ))}
    </div>
    <div className="navbar__menu--buttons">
     <div className="navbar__menu--button">
      <MagnifyingGlassIcon />
     </div>
     <a
      href="/"
      className="navbar__menu--button"
     >
      <HeartIcon />
     </a>
     <a
      href="/"
      className="navbar__menu--button"
     >
      <ShoppingCartIcon />
     </a>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
