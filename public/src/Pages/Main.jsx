import React from "react";
import NavBar from "../Components/NavBar";
import HeroImage from "../Components/HeroImage";
import Cards from "../Components/Cards";
import Footer from "../Components/Footer";
import AdminNavBar from "../Components/AdminNavBar";
import AdminOrders from "../Components/AdminOrders";
import AdminCards from "../Components/AdminCards";

function Main(props) {
  return (
    <div className="main">
      <NavBar update={props.update}/>
      <HeroImage />
      {/**
       * TODO:
       * props.products.map(product => <Card product={product}/>)
       */}
      <Cards products={props.products}/>
      <Footer />
    </div>
  );
}

export default Main;
