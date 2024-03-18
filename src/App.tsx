import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./styles/styles.scss";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Favourites from "./pages/Favourites/Favourites";
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/ProductPage/ProductPage";
import { useEffect } from "react";
import { fetchProducts } from "./utils/redux/productsSlice";
import { useDispatch } from "react-redux";
import Shop from "./pages/Shop/Shop";
import Collection from "./pages/Collection/CollectionPage";
import { fetchCollections } from "./utils/redux/collectionsSlice";

export interface Product {
 id: number;
 name: string;
 gender: Array<string>;
 product_type: string;
 categories: Array<string>;
 age_group: string;
 price: number;
 date_added: string;
 available_sizes: Array<string>;
 description: string;
 images?: Array<string>;
 popularity: number;
 rating: number;
 number_of_bought: number;
}

export interface Collection {
 id: number;
 name: string;
 image: string;
}

function App() {
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(fetchProducts());
  dispatch(fetchCollections());
 }, []);

 return (
  <>
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
       path="/favourites"
       element={<Favourites />}
      />
      <Route
       path="/cart"
       element={<Cart />}
      />
      <Route
       path="/product/:id"
       element={<ProductPage />}
      />
      <Route
       path="/collection/:name"
       element={<Collection />}
      />
      <Route
       path="/"
       element={<Navigate to="/home" />}
      />
     </Routes>
    </div>
    <Footer />
   </HashRouter>
  </>
 );
}

export default App;
