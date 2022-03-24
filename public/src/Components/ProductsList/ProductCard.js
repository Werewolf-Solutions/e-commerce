import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia
} from '@mui/material'
import img from '../../files/pizza-margherita.jpeg'

export default function ProductCard(props) {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={`Name: ${props.product.name}`}
                    subheader={`Price: ${props.product.price} ${props.currency}`}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={img}
                    alt="Pizza margherita"
                />
                <CardContent>
                    Description: {props.product.description}
                </CardContent>
                <CardActions>
                    Quantity: {props.product.quantity}
                    <button onClick={() => props.addToCart(props.product)}>add to cart</button>
                </CardActions>
            </Card>
        </div>
    )
}
