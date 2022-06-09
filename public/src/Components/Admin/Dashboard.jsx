import React from 'react'
import { acceptOrder } from "../../apiCalls/orderController";
import { refundPaymentIntent } from "../../apiCalls/paymentController";
import "../../Styles/admin-orders-styles.css";

import { io } from 'socket.io-client'
import OrderBody from './OrderBody';

const socket = io()

export default function Dashboard(props) {
  return (
    <div class="admin-orders row mt-2">
      <div class="accepted-orders col-sm-4">
        <p className="order-status mt-3 ms-4">orders history</p>
        <div class="card mb-3 ms-3 me-3">
          <div class="card-body">
            <OrderBody order={props.order}/>
            <a
              onClick={() => {
                console.log(props.order.payment_intent)
                refundPaymentIntent(props.order.payment_intent).then((order) => {
                  props.update()
                  socket.emit('new_order', {order})
                })
              }}
              class="btn btn-warning me-2 btn-sm"
            >
              Refund
            </a>
            <a
              onClick={() => {
                acceptOrder(props.order).then((order) => {
                  props.update()
                  socket.emit('new_order', {order})
                })
              }}
              class="btn btn-danger btn-sm"
            >
              Accept / start order again
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
