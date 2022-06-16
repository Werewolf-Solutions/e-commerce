import React from "react";
import HeroImage from "../Components/HeroImage";
import Card from "../Components/Card";
import UserOrders from "../Components/Orders/UserOrders";
import { getOrders } from "../apiCalls/orderController";
import OrderBody from "../Components/Admin/OrderBody";
import "../Styles/admin-orders-styles.css";

function Main(props) {

  const [guestOrders, setGuestOrders] = React.useState([])
  const [email, setEmail] = React.useState([])

  const getGuestOrders = async () => {
    // TODO: sort/filter orders
    let orderedBy = {email: email}
    let {orders} = await getOrders(orderedBy)
    setGuestOrders(orders)
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  if (props.selected === "products") {
    if (props.products) {
      return(
      <div className="card-deck">
        <HeroImage />
        {props.products.map((category) => (
          <div>
            <h2 id="sideorders" className="cardMenuHeader mt-4 mb-4 ms-4">
              {category.category}
            </h2>
            <div className="container">
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

  if (props.selected === "orders") {
    if (props.orders && props.user) {
      return(
        // <div class="container">
        //   <div class="row orders-in">
        //     <div class="col-sm">
        //       1st column orders in
        //     </div>
        //     <div class="col-sm">
        //       2nd column orders in
        //     </div>
        //     <div class="col-sm">
        //       3rd column orders in
        //     </div>
        //   </div>
        //   <div class="row accepted-orders">
        //     <div class="col-sm">
        //       1st column accepted orders
        //     </div>
        //     <div class="col-sm">
        //       2nd column accepted orders
        //     </div>
        //     <div class="col-sm">
        //       3rd column accepted orders
        //     </div>
        //   </div>
        //   <div class="row completed-orders">
        //     <div class="col-sm">
        //       1st column completed orders
        //     </div>
        //     <div class="col-sm">
        //       2nd column completed orders
        //     </div>
        //     <div class="col-sm">
        //       3rd column completed orders
        //     </div>
        //   </div>
        // </div>

        <div class="user-orders row mt-2">
          <div class="orders-in column">
            <p className="order-status mt-3 ms-4">Active orders</p>
            <p className="order-statussub ms-4  mb-2">
              Orders to be accepted below...
            </p>
            {props.ordersIn.map(order => (
              <div class="card mb-3 ms-3 me-3 col-sm">
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
              <div class="card mb-3 ms-3 me-3 col-sm">
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
              <div class="card mb-3 ms-3 me-3 col-sm">
                <div class="card-body">
                  <UserOrders order={order} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    } else if (!props.user) {
      return(
        <div class="orders-in">
          <p className="order-status mt-3 ms-4">Search order</p>
          <p className="order-status sub ms-4 mb-2">
            Enter email below
          </p>
          <input onChange={handleChange}></input>
          <a onClick={getGuestOrders}>search</a>
          <div class="row">
            {guestOrders.length != 0
            ? 
              guestOrders.map(order => (
                <div class="card mb-3 ms-3 me-3 col-sm">
                  <div class="card-body">
                    <OrderBody order={order} />
                  </div>
                </div>
              ))
            : null
            }
          </div>
        </div>
      )
    }
  }
}

export default Main;
