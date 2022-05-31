import React from "react";
import HeroImage from "../Components/HeroImage";
import Card from "../Components/Card"
import UserAccount from "../Components/UserAccount";

function Main(props) {
  console.log(props.products)
  return (
    <div className="main">
      <HeroImage />
      {props.selected === 'products'
      ?
        props.products
        ? 
          props.products.map(category => (
            <div>
              {category.category}
              {category.products.map(prod => (
                <Card
                  product={prod}
                  update={props.update}
                  addToCart={props.addToCart}
                />
              ))}
            </div>
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
