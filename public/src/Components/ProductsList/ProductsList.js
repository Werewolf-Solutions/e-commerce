import React from 'react'
import axios from 'axios'

export default function ProductsList(props) {    
    return (
        <div>
            Products list<br/><br/>
            {props.productsList ? props.productsList.map((product) => (
                <div key={product._id}>
                    Category: {product.category}<br/>
                    Name: {product.name}<br/>
                    Price: {product.price}<br/>
                    Description: {product.description}<br/>
                    Quantity: {product.quantity}<br/>
                    <button onClick={() => props.addToCart(product)}>add to cart</button>
                </div>
            )): null}
        </div>
    )
}
