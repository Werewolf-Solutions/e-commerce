import React from 'react'
import "../../Styles/admin-orders-styles.css";

export default function OrderBody(props) {
  // console.log(props.order)
    return (
        <div>
            <h5 class="card-title">Order number: {props.order.number}</h5>
            <h5 class="card-title">Order id: {props.order._id}</h5>
            <h5 class="card-title">Date: {props.order.date}</h5>
            <p class="card-text">Shipping Method: {props.order.shipping_method}</p>
            <p class="card-text">
              {props.order.payment_method
              ?
                <div>
                  <p class="card-text">Payment Method: {props.order.payment_method.type}</p>
                  <p class="card-text">Last4: {`xxxx-xxxx-xxxx-${props.order.payment_method.last4}`}</p>
                </div>
              : 
                <div>
                  <p class="card-text">Payment Method: cash</p>
                </div>
              }
            </p>
            <p class="card-text">Customer Name: {props.order.orderedBy.name}</p>
            <p class="card-text">Customer Telephone: {props.order.orderedBy.mobile}</p>
            <p class="card-text">
              {props.order.shipping_method === 'delivery'
              ?
                props.order.address
                ?
                  <div>
                    <p class="card-text">Customer Address: {props.order.address.number}, {props.order.address.line1}, {props.order.address.city}, {props.order.address.country}, {props.order.address.postcode}</p>
                  </div>
                : null
              : null
              }
            </p>
            <p class="card-text">Order Details</p>
            {props.order.items
            ?
              props.order.items.map(item => (
                <div>
                  <ul>
                    <li>{item.name} x {item.quantity}</li>
                  </ul>
                </div>
              ))
            : null
            }
            <p class="card-text">Total Price: {props.order.total_amount}</p>
        </div>
    )
}
