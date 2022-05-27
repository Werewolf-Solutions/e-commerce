import React from "react";
import HeroImage from "../Components/HeroImage";
import Card from "../Components/Card"

function Main(props) {
  return (
    <div className="main">
      <HeroImage />
       {props.products
       ? 
          props.products.map(product => (
            <Card
              product={product}
              update={props.update}
              addToCart={props.addToCart}
            />
          ))
       : 'loading'
       }
    </div>
  );
}

export default Main;
