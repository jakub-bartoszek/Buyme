import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./styles/styles.scss";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Favourites from "./pages/Favourites/Favourites";
import Search from "./pages/Search.tsx/Search";

function App() {
 return (
  <div>
   <HashRouter>
    <Navbar />
    <div className="wrapper">
     <Routes>
      <Route
       path="/home"
       element={<Home />}
      />
      <Route
       path="/shop"
       element={<Shop />}
      />
      <Route
       path="/about"
       element={<About />}
      />
      <Route
       path="/contact"
       element={<Contact />}
      />
      <Route
       path="/search"
       element={<Search />}
      />
      <Route
       path="/favorites"
       element={<Favourites />}
      />
      <Route
       path="/cart"
       element={<Cart />}
      />
      <Route
       path="/"
       element={<Navigate to="/home" />}
      />
     </Routes>
     <footer></footer>
    </div>
   </HashRouter>
  </div>
 );
}

export default App;
