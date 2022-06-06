import React from "react";
import { acceptOrder } from "../../apiCalls/orderController";
import { refundPaymentIntent } from "../../apiCalls/paymentController";
import "../../Styles/admin-orders-styles.css";
import OrderBody from "./OrderBody"

export default function AdminOrder(props) {
  // console.log(props.order)
  return (
    <div>
      <OrderBody order={props.order}/>
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
  );
}
