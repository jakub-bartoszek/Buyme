import { useParams } from "react-router-dom";
import "./Collection.scss";

const Collection = () => {
 const { name } = useParams();

 return (
  <main className="collection">
   <header className="collection__banner"></header>
  </main>
 );
};

export default Collection;
