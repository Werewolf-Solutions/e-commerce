import React from 'react'
import OrderBody from "../Admin/OrderBody"
import { completeOrder } from '../../apiCalls/orderController'

// import { io } from 'socket.io-client'

// const socket = io()

export default function ReadyOrder(props) {
  return (
    <div>
      <OrderBody order={props.order}/>
        <a
          class="btn btn-success btn-sm"
          onClick={() => {
            completeOrder(props.order).then((order) => {
              props.update()
              // socket.emit('order_update', {order})
            })
          }}
        >
          Clear Order
        </a>
    </div>
  )
}
