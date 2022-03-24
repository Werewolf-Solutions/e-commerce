import React from 'react'
import Orders from './Orders'

export default function UserOrders(props) {
    return (
        <div>
            User's orders<br/><br/>
            <Orders
                user={props.user}
                currency={props.currency}
            />
        </div>
    )
}
