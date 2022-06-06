import React from 'react'
import { completeOrder } from '../../apiCalls/orderController'

export default function ReadyOrder(props) {
  return (
    <div>
      <div>
          <p className="order-status mt-3 ms-4">orders completed</p>
          <p className="order-statussub ms-4  mb-2">
            Orders waiting for collection / delivery below...
          </p>
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
                class="btn btn-success btn-sm"
                onClick={() => {
                  completeOrder(props.order).then(() => props.update())
                }}
              >
                Clear Order
              </a>
            </div>
          </div>
        </div>
    </div>
  )
}
