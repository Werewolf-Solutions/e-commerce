import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia
} from '@mui/material'
import img from '../../files/pizza-margherita.jpeg'

export default function AdminProductCard(props) {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={`Name: ${props.product.name}`}
                    subheader={`Price: ${props.product.price}`}
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
                    <button onClick={props.handleEditProduct}>edit product</button>
                    <button onClick={() => props.deleteProductFromProductsList(props.product)}>delete product</button>
                </CardActions>
            </Card>
        </div>
    )
}
