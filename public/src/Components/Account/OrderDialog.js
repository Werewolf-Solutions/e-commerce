import React from 'react'
import { Dialog } from '@mui/material'

export default function OrderDialog(props) {
  return (
    <div>
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            {props.order
            ? <div>
                Order id: {props.order.order_id} or {props.order._id}<br/><br/>
                Address:<br/>
                -Postcode: {props.order.address.postcode}<br/><br/>
                Items: {props.order.items.map(item =>
                <div>
                    Name: {item.name}
                </div>)}<br/>
                Amount: {props.order.total_amount/100}
            </div>
            : 'loading'
            }
        </Dialog>
    </div>
  )
}
