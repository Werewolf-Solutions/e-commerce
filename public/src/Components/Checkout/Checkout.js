import React from 'react'

export default function Checkout(props) {
    return (
        <div>
            Checkout<br/>
            Cart total<br/>
            Details confirmation<br/>
            <button onClick={props.checkout}>confirm checkout</button>
        </div>
    )
}
