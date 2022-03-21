import React from 'react'
import {
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    CardMedia,
    Card
} from '@mui/material'
import img from '../../files/pizza-margherita.jpeg'

export default function ItemCard(props) {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={`Name: ${props.item.name}`}
                    subheader={`Price: ${props.item.price}`}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={img}
                    alt="Pizza margherita"
                />
                <CardContent>
                    <Typography variant="h5">
                        Category: {props.item.category}
                    </Typography>
                    <Typography variant="h5">
                        Description: {props.item.description}
                    </Typography>
                    <Typography variant="h5">
                        Quantity: {props.item.quantity}
                    </Typography>
                </CardContent>
                <CardActions>
                    <button onClick={() => props.deleteFromCart(props.item)}>delete from cart</button>
                </CardActions>
            </Card>
        </div>
    )
}
