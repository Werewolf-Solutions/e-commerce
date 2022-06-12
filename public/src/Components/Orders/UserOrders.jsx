import React from 'react'
import OrderBody from '../Admin/OrderBody'
import "../../Styles/user-orders.css"

export default function UserOrders(props) {
  return(
    <div>
      <OrderBody order={props.order}/>
    </div>
  )
}
