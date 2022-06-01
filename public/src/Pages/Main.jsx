import React from "react";
import HeroImage from "../Components/HeroImage";
import Card from "../Components/Card"
import UserAccount from "../Components/UserAccount";

function Main(props) {
  console.log(props.products)
  return (
    <div className="main">
      {props.selected === 'products'
      ?
        <div>
          <HeroImage />
          {props.products
          ? 
            props.products.map(category => (
              <div>
                <div className="col-12">
                  <h2 id="sideorders" className=" cardMenuHeader mt-4 mb-4 ms-4">
                    {category.category}
                  </h2>
                </div>
                {category.products.map(prod => (
                  <Card
                    product={prod}
                    update={props.update}
                    addToCart={props.addToCart}
                  />
                ))}
              </div>
            ))
          : 'loading'}
        </div>
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
