import * as React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import {
    Checkbox,
    FormControlLabel
} from '@mui/material'
import AddressCard from './AddressCard'

export default function Review(props) {
    // console.log(props.cart)
    console.log(props.card)
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Order summary
        </Typography>
        <List disablePadding>
            {props.cart.map((product) => (
            <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.description} />
                <Typography variant="body2">{product.price} {props.currency}</Typography>
            </ListItem>
            ))}

            <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {props.cart.total_cart} {props.currency}
            </Typography>
            </ListItem>
        </List>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping
            </Typography>
            {props.shippingMethod === 'delivery'
            ? 
                <AddressCard 
                    user={props.user}
                />
            :
                <Typography variant="h7" gutterBottom sx={{ mt: 2 }}>
                    Pick up
                </Typography>
            }
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Payment details
                </Typography>
                {props.paymentMethod === 'card'
                ?
                <div>
                    <Grid item>
                        <Typography gutterBottom>
                            Card name: {props.card.cardName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom>
                            Card number: {props.card.last4}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom>
                            Expire month: {props.card.exp_month}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom>
                            Expire year: {props.card.exp_year}
                        </Typography>
                    </Grid>

                </div>
                : 'Cash'
                }
            </Grid>
        </Grid>
            <FormControlLabel
                control={<Checkbox color="secondary" name="payment-terms-and-conditions" value="yes" />}
                label="Checkbox to agree terms and conditions"
            />
        </React.Fragment>
    )
}