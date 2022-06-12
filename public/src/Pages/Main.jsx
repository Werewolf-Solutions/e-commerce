import React from "react";
import HeroImage from "../Components/HeroImage";
import Card from "../Components/Card";
import UserOrders from "../Components/Orders/UserOrders";

function Main(props) {
  if (props.selected === "products") {
    if (props.products) {
      return(
      <div className="card-deck">
        <HeroImage />
        {props.products.map((category) => (
          <div>
            <h2 id="sideorders" className=" cardMenuHeader mt-4 mb-4 ms-4">
              {category.category}
            </h2>
            <div className="container ">
              <div className="row">
                {category.products.map((prod) => (
                  <Card
                    product={prod}
                    update={props.update}
                    addToCart={props.addToCart}
                    deleteFromCart={props.deleteFromCart}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>)
    }
  }

  if (props.selected === "user-orders") {
    if (props.orders) {
      return(
        <div class="user-orders row mt-2">
          <div class="orders-in column">
            <p className="order-status mt-3 ms-4">Active orders</p>
            <p className="order-statussub ms-4  mb-2">
              Orders to be accepted below...
            </p>
            {props.ordersIn.map(order => (
              <div class="card mb-3 ms-3 me-3">
                <div class="card-body">
                  <UserOrders order={order} />
                </div>
              </div>
            ))}
          </div>
          <div class="accepted-orders column">
            <p className="order-status mt-3 ms-4">orders accepted</p>
            <p className="order-statussub ms-4  mb-2">
              Orders accepted below...
            </p>
            {props.acceptedOrders.map(order => (
              <div class="card mb-3 ms-3 me-3">
                <div class="card-body">
                  <UserOrders order={order} />
                </div>
              </div>
            ))}
          </div>
          <div class="completed-orders column">
            <p className="order-status mt-3 ms-4">orders completed</p>
            <p className="order-statussub ms-4  mb-2">
              Orders completed are listed below ...
            </p>
            {props.orders.map(order => (
              <div class="card mb-3 ms-3 me-3">
                <div class="card-body">
                  <UserOrders order={order} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}

export default Main;
