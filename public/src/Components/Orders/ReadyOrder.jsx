import React, {useContext} from 'react'
import OrderBody from "../Admin/OrderBody"
import { completeOrder } from '../../apiCalls/orderController'

import {SocketContext} from '../../service/socket';

// import { io } from 'socket.io-client'

// const socket = io()

export default function ReadyOrder(props) {
  const socket = useContext(SocketContext)
  return (
    <div>
      <OrderBody order={props.order}/>
        <a
          class="btn btn-success btn-sm"
          onClick={() => {
            completeOrder(props.order).then((order) => {
              props.update()
              socket.emit('order_update', {order})
            })
          }}
        >
          Clear Order
        </a>
    </div>
  )
}
