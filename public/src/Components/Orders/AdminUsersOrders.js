import React from 'react'
import axios from 'axios'

export default function AdminUsersOrders(props) {
    const acceptOrder = async (order) => {
        let res = await axios.post('/users/accept-order', {order})
        console.log(res.data)
        props.updateUser()
    }

    const deleteOrder = async (order) => {
        let res = await axios.post('/users/delete-order', {order})
        console.log(res.data)
        props.updateUser()
    }

    const declineOrder = async (order) => {
        let res = await axios.post('/users/decline-order', {order})
        console.log(res.data)
        props.updateUser()
    }

    return (
        <div>
            Users' orders<br/><br/>
            {props.user
            ? props.user.orders.map(order => (
                <div id={order._id}>
                    User id: {order.user_id}<br/>
                    Order id: {order._id}<br/>
                    Postcode: {order.address.postcode}<br/>
                    Accepted: {order.accepted ? 'yes' : 'not'}<br/>
                    {order.items.map(item => (
                        <div id={item._id}>
                            Category: {item.category}<br/>
                            Name: {item.name}<br/>
                            Price: {item.price}<br/>
                            Description: {item.description}<br/>
                            Quantity: {item.quantity}
                        </div>
                    ))}<br/>
                    <button onClick={() => deleteOrder(order)}>delete order</button>
                    <button onClick={() => acceptOrder(order)}>accept order</button>
                    <button onClick={() => declineOrder(order)}>decline order</button><br/><br/>
                </div>
            ))
            : null}
        </div>
    )
}
