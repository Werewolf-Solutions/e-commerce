import React from 'react'

export default function Cart(props) {
    return (
        <div>
            {props.cart ? props.cart.map(item => 
            <div key={item._id}>
                Category: {item.category}<br/>
                Name: {item.name}<br/>
                Price: {item.price}<br/>
                Description: {item.description}<br/>
                Quantity: {item.quantity}<br/>
                <button onClick={() => props.deleteFromCart(item)}>delete from cart</button>
            </div>) : null}
            <button onClick={() => props.handleSelected('products-list')}>products list</button><br/>
            <button onClick={() => props.handleSelected('checkout')}>confirm checkout</button>
        </div>
    )
}
