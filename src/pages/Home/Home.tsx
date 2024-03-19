import React from "react";
import "./Home.scss";
import { useSelector } from "react-redux";
import { Collection } from "../../App";
import HomeSection from "../../components/HomeSection/HomeSection";
import { selectCollections } from "../../utils/redux/collectionsSlice";

const Home: React.FC = () => {
 const collections: Collection[] = useSelector(selectCollections);

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
};

export default Home;
