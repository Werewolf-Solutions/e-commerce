import React from "react";
import { acceptOrder } from "../../apiCalls/orderController";
import { refundPaymentIntent } from "../../apiCalls/paymentController";
import "../../Styles/admin-orders-styles.css";

export default function AdminOrder(props) {
  console.log(props.order)
  return (
    <div class="admin-orders row mt-2">
      {/* orders in prep */}
      <div class="accepted-orders col-sm-4">
        <p className="order-status mt-3 ms-4">orders accepted</p>
        <p className="order-statussub ms-4  mb-2">
          Accept or Decline orders below...
        </p>
        {/* cards moved from orders in to here on accept */}
        <div class="card mb-3 ms-3 me-3">
          <div class="card-body">
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
            <a
              onClick={() => {
                console.log(props.order.payment_intent)
                refundPaymentIntent(props.order.payment_intent).then(() => props.update())
              }}
              class="btn btn-warning me-2 btn-sm"
            >
              Decline / Refund
            </a>
            <a
              onClick={() => {
                acceptOrder(props.order).then(() => props.update())
              }}
              class="btn btn-danger btn-sm"
            >
              Accept / start order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
