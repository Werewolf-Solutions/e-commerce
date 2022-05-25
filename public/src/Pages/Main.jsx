import React from "react";
import HeroImage from "../Components/HeroImage";
import Cards from "../Components/Cards";

function Main(props) {
  return (
    <div className="main">
      <HeroImage />
      {/**
       * TODO:
       * props.products.map(product => <Card product={product}/>)
       */}
      <Cards products={props.products}/>
    </div>
  );
}

export default Main;
