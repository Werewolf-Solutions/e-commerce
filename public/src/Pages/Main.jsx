import React from "react";
import NavBar from "../Components/NavBar";
import HeroImage from "../Components/HeroImage";
import Cards from "../Components/Cards";
import Footer from "../Components/Footer";

function Main() {
  return (
    <div className="main">
      <NavBar />
      <HeroImage />
      <Cards />
      <Footer />
    </div>
  );
}

export default Main;
