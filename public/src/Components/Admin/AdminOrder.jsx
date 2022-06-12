import React, {useContext} from "react";
import { acceptOrder } from "../../apiCalls/orderController";
import { refundPaymentIntent } from "../../apiCalls/paymentController";
import "../../Styles/admin-orders-styles.css";
import OrderBody from "./OrderBody"

import {SocketContext} from '../../service/socket'

// import { io } from 'socket.io-client'

// const socket = io()

export default function AdminOrder(props) {
  const socket = useContext(SocketContext)
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
          acceptOrder(props.order).then((order) => {
            props.update()
            socket.emit('order_update', {order})
          })
        }}
        class="btn btn-danger btn-sm"
      >
        Accept / start order
      </a>
    </div>
  );
}
