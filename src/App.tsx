import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./styles/styles.scss";
import Home from "./pages/Home/Home";

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
