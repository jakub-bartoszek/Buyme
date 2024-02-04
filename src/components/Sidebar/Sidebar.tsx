import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar: React.FC<{
 showSidebar: boolean;
 setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showSidebar, setShowSidebar }) => {
 return (
  <>
   {showSidebar && (
    <div
     className="sidebar-shadow"
     onClick={() => setShowSidebar(false)}
    />
   )}

   <div className={`sidebar ${showSidebar && "shown"}`}>
    <NavLink
     to="/"
     className="sidebar__logo"
    >
     <h1>BuyMe!</h1>
    </NavLink>
    <div className="sidebar__menu-links">
     <NavLink
      to="/home"
      onClick={() => setShowSidebar(false)}
     >
      Home
     </NavLink>
     <NavLink
      to="/shop"
      onClick={() => setShowSidebar(false)}
     >
      Shop
     </NavLink>
     <NavLink
      to="/about"
      onClick={() => setShowSidebar(false)}
     >
      About
     </NavLink>
     <NavLink
      to="/contact"
      onClick={() => setShowSidebar(false)}
     >
      Contact
     </NavLink>
    </div>
   </div>
  </>
 );
};

export default Sidebar;
