import React from 'react'
import "../../Styles/admin-orders-styles.css";

export default function OrderBody(props) {
  // console.log(props.order)
    return (
        <div>
            <h5 class="card-title">Order number: {props.order.number}</h5>
            <h5 class="card-title">Order id: {props.order._id}</h5>
            <h5 class="card-title">Date: {props.order.date}</h5>
            <p>Shipping Method: {props.order.shipping_method}</p>
            <p>
              {props.order.payment_method
              ?
                <div>
                  <p>Payment Method: {props.order.payment_method.type}</p>
                  <p>Last4: {`xxxx-xxxx-xxxx-${props.order.payment_method.last4}`}</p>
                </div>
              : 
                <div>
                  <p>Payment Method: cash</p>
                </div>
              }
            </p>
            <p>Customer Name: {props.order.orderedBy.name}</p>
            <p>Customer Telephone: {props.order.orderedBy.mobile}</p>
            <p>
              {props.order.shipping_method === 'delivery'
              ?
                props.order.address
                ?
                  <div>
                    <p>Customer Address: {props.order.address.number}, {props.order.address.line1}, {props.order.address.city}, {props.order.address.country}, {props.order.address.postcode}</p>
                  </div>
                : null
              : null
              }
            </p>
            <p>Order Details</p>
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
            <p>Total Price: {props.order.total_amount}</p>
        </div>
    )
}
