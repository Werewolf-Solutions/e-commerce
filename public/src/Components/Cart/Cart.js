import { Grid } from '@mui/material'
import React from 'react'
import ItemCard from './ItemCard'

export default function Cart(props) {
    return (
        <div>
            {props.cart
            ?
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {props.cart.map(item => (
                    <Grid item xs={2}>
                        <ItemCard
                            item={item}
                            deleteFromCart={props.deleteFromCart}
                            currency={props.currency}
                        />
                    </Grid>
                ))}
            </Grid>
            : null
            }
        </div>
    )
}
