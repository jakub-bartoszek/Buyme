import React from "react";
import "./Home.scss";
import { useSelector } from "react-redux";
import { Collection } from "../../App";
import HomeSection from "../../components/HomeSection/HomeSection";
import { selectCollections, selectCollectionsStatus } from "../../utils/redux/collectionsSlice";
import Loader from "../../components/Loader/Loader";

const Home: React.FC = () => {
 const collections: Collection[] = useSelector(selectCollections);
 const collectionsStatus = useSelector(selectCollectionsStatus);

 switch (collectionsStatus) {
  case "loading":
   return (
    <main className="home">
     <main className="home__loader-wrapper">
      <Loader />
     </main>
    </main>
   );
  case "success":
   return (
    <main className="home">
     <header className="home__banner" />
     {collections.map((collection) => (
      <HomeSection
       name={collection.name}
       image={collection.image}
      />
     ))}
    </main>
   );
  default:
   return null;
 }
};

export default Home;
