import React from 'react'

export default function Footer(props) {
    return (
        <div>
            <button onClick={() => props.handleSelected('cart')}>cart {'total'}</button>
            <button onClick={() => props.handleSelected('products-list')}>products list</button>
            <button onClick={() => props.handleSelected('cart')}>checkout</button>
        </div>
    )
}
