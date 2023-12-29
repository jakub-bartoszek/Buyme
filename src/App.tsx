import Navbar from "./components/Navbar/Navbar";
import "./styles/styles.scss";

function App() {
 return (
  <div>
   <Navbar />
   <div className="wrapper">
    <header>
     <div className="banner"></div>
    </header>
    <main></main>
    <footer></footer>
   </div>
  </div>
 );
}

export default App;
