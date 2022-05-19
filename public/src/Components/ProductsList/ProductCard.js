import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Button
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Grid } from '@mui/material'

export default function ProductCard(props) {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={props.product.img ? `/uploads/${props.product.img.filename}` : null}
                    alt={props.product.name}
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={8} sm={8} md={8} ls={8}>
                            {props.product.name}
                        </Grid>
                        <Grid item xs={2} sm={3} md={4} ls={6}>
                            {props.product.price} ${props.currency}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item xs={8} sm={8} md={8} ls={8}>
                            Quantity: {props.product.quantity}
                        </Grid>
                        <Grid item xs={2} sm={3} md={4} ls={6}>
                            <Button
                                variant="outlined"
                                onClick={() => props.addToCart(props.product)}
                            >
                                <AddIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </div>
    )
}
