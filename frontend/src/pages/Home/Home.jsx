import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import ClothingDisplay from "../../components/ClothingDisplay/ClothingDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Header />
      <ExploreMenu setCategory={setCategory} category={category} />
      <ClothingDisplay category={category} />
      <AppDownload />
    </>
  );
};

export default Home;
