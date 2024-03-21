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
import { fetchProducts, selectProductsStatus } from "./utils/redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import Shop from "./pages/Shop/Shop";
import Collection from "./pages/Collection/CollectionPage";
import { fetchCollections } from "./utils/redux/collectionsSlice";
import Loader from "./components/Loader/Loader";

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
 const status = useSelector(selectProductsStatus);

 useEffect(() => {
  dispatch(fetchProducts());
  dispatch(fetchCollections());
 }, []);

 const renderContent = () => {
  switch (status) {
   case "loading":
    return <Loader />;
   case "error":
    return <div>Error</div>;
   case "success":
    return (
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
    );
   default:
    return null;
  }
 };

 return (
  <>
   <HashRouter>
    <Navbar />
    <div className="wrapper">{renderContent()}</div>
    <Footer />
   </HashRouter>
  </>
 );
}

export default App;
