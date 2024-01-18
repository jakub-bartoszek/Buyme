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
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/ProductPage/ProductPage";
import { useEffect } from "react";
import { setProducts } from "./redux/productsSlice";
import { useDispatch } from "react-redux";
export interface Product {
 id: number;
 name: string;
 categories: Array<string>;
 price: number;
 date_added: string;
 available_sizes: Array<string>;
 description: string;
 images?: Array<string>;
 popularity: number;
 rating: number;
 number_of_bought: number;
}

function App() {
 const dispatch = useDispatch();
 const fetchProducts = async () => {
  try {
   const response = await fetch("./products.json", {
    headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
    }
   });
   const fetchedProducts = await response.json();
   dispatch(setProducts(fetchedProducts));
  } catch (error) {
   console.error("Error fetching products:", error);
  }
 };

 useEffect(() => {
  fetchProducts();
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
       path="/search"
       element={<Search />}
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
