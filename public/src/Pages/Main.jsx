import React from "react";
import HeroImage from "../Components/HeroImage";
import Card from "../Components/Card"
import UserAccount from "../Components/UserAccount";

function Main(props) {
  console.log(props.orders)
  return (
    <div className="main">
      <HeroImage />
      {props.selected === 'products'
      ?
        props.products
        ? 
          props.products.map(product => (
            <Card
              product={product}
              update={props.update}
              addToCart={props.addToCart}
            />
          ))
        : 'loading'
      : props.selected === 'user-orders'
        ?
          props.orders.map(order => (
            <UserAccount
                order={order}
            />
          ))
        : 'do it for guests'
      }
    </div>
  );
}

export default Main;
