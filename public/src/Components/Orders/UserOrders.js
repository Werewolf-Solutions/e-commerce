import React from 'react'

export default function UserOrders(props) {
    return (
        <div>
            User's orders<br/><br/>
            {props.user
            ? props.user.orders.map(order => (
                <div>
                    Order id: {order.order_id}<br/>
                    Postcode: {order.address.postcode}<br/>
                    Accepted: {order.accepted ? 'yes' : 'not'}<br/>
                    {order.items.map(item => (
                        <div>
                            Category: {item.category}<br/>
                            Name: {item.name}<br/>
                            Price: {item.price}<br/>
                            Description: {item.description}<br/>
                            Quantity: {item.quantity}
                        </div>
                    ))}<br/><br/>
                </div>
            ))
            : null}
        </div>
    )
}
