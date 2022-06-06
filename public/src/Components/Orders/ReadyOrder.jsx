import React from 'react'
import OrderBody from "../Admin/OrderBody"
import { completeOrder } from '../../apiCalls/orderController'

export default function ReadyOrder(props) {
  return (
    <div>
      <OrderBody order={props.order}/>
        <a
          class="btn btn-success btn-sm"
          onClick={() => {
            completeOrder(props.order).then(() => props.update())
          }}
        >
          Clear Order
        </a>
    </div>
  )
}
