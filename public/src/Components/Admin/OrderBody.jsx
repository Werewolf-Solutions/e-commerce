import React from 'react'
import moment from 'moment';
import "../../Styles/admin-orders-styles.css";

export default function OrderBody(props) {
  // console.log(props.order)
  const formatDate = moment(props.order.date).format('DD-MM-YYYY')
  console.log(formatDate)
    return (
        <div>
            <h5 className="order-text">Order number: <span className="order-subtext">{props.order.number}</span></h5>
            <h5 class="order-text">Order id: <span className="order-subtext">{props.order._id.slice(20, props.order._id.length)}</span></h5>
            <h5 class="order-text">Date: <span className="order-subtext">{moment(props.order.date).format('DD MMMM YYYY')}</span></h5>
            <h5 class="order-text">Time: <span className="order-subtext">{moment(props.order.date).format('HH:mm')}</span></h5>
            <p class="order-text">Shipping Method: <span className="order-subtext">{props.order.shipping_method}</span></p>
            {props.order.payment_method
            ?
              <div>
                <p class="order-text">Payment Method: <span className="order-subtext">{props.order.payment_method.type}</span></p>
                <p class="order-text">Last4: <span className="order-subtext">{`xxxx-xxxx-xxxx-${props.order.payment_method.last4}`}</span></p>
              </div>
            : 
              <div>
                <p>Payment Method: <span className="order-subtext">cash</span></p>
              </div>
            }
            <p class="order-text">Customer Name: <span className="order-subtext">{props.order.orderedBy.name}</span></p>
            <p class="order-text">Customer Telephone: <span className="order-subtext">{props.order.orderedBy.mobile}</span></p>
            {props.order.shipping_method === 'delivery'
            ?
              props.order.address
              ?
                <div>
                  <p class="order-text">Customer Address: <span className="order-subtext">{props.order.address.number}, {props.order.address.line1}, {props.order.address.city}, {props.order.address.country}, {props.order.address.postcode}</span></p>
                </div>
              : null
            : null
            }
            <p class="order-subtext">Order Details</p>
            {props.order.items
            ?
              props.order.items.map(item => (
                <div>
                  <ul>
                    <li class="order-subtext">{item.name} x {item.quantity}</li>
                  </ul>
                </div>
              ))
            : null
            }
            <p class="order-text">Total Price: <span className="order-subtext">£ {props.order.total_amountFormatted}</span></p>
        </div>
    )
}
