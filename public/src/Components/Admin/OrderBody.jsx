import React from 'react'
import "../../Styles/admin-orders-styles.css";

export default function OrderBody(props) {
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
                  Payment Method: {props.order.payment_method.type}
                </div>
              : 'cash'
              }
            </p>
            <p class="card-text">Customer Name: {props.order.orderedBy.name}</p>
            <p class="card-text">Customer Telephone: {props.order.orderedBy.mobile}</p>
            <p class="card-text">
              {props.order.shipping_method === 'delivery'
              ?
                <div>
                  Customer Address: {props.order.address.number}, {props.order.address.line1}, {props.order.address.city}, {props.order.address.country}, {props.order.address.postcode}
                </div>
              : 'pick-up'
              }
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: {props.order.total_amount}</p>
        </div>
    )
}
