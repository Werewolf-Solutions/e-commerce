import React from 'react'
import OrderBody from "../Admin/OrderBody"
import { orderReady } from '../../apiCalls/orderController'

// import { io } from 'socket.io-client'

// const socket = io()

export default function AcceptedOrder(props) {
    return (
        <div>
            <OrderBody order={props.order}/>
            <a class="btn btn-info me-2 btn-sm">
                Print
            </a>
            <a
                class="btn btn-primary btn-sm"
                onClick={() => {
                    orderReady(props.order).then((order) => {
                        props.update()
                        // socket.emit('order_update', {order})
                    })
                }}
            >
                Completed
            </a>
        </div>
    )
}
