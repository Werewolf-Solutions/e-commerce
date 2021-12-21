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

const products = [
    {
        name: 'Product 1',
        desc: 'A nice thing',
        price: '$9.99',
    },
    {
        name: 'Product 2',
        desc: 'Another thing',
        price: '$3.45',
    },
    {
        name: 'Product 3',
        desc: 'Something else',
        price: '$6.51',
    },
    {
        name: 'Product 4',
        desc: 'Best thing of all',
        price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
]

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA']
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
]

export default function Review(props) {
    console.log(props.cart)
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Order summary
        </Typography>
        <List disablePadding>
            {props.cart.map((product) => (
            <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.description} />
                <Typography variant="body2">{product.price}</Typography>
            </ListItem>
            ))}

            <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {props.cart.total_cart}
            </Typography>
            </ListItem>
        </List>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Shipping
                </Typography>
                <Typography gutterBottom>
                    Name: {props.state.firstName} {props.state.lastName}
                </Typography>
                <Typography gutterBottom>
                    Address: {props.state.number}, {props.state.address1}, {props.state.address2}, {props.state.city}, {props.state.state}, {props.state.country}, {props.state.postcode}
                </Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Payment details
                </Typography>
                <Grid item>
                    <Typography gutterBottom>
                        Card name: {props.state.cardName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom>
                        Card number: {props.state.cardNumber}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom>
                        Expire month: {props.state.expMonth}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom>
                        Expire year: {props.state.expYear}
                    </Typography>
                </Grid>
                {/* {payments.map((payment) => (
                <React.Fragment key={payment.name}>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                    </Grid>
                </React.Fragment>
                ))} */}
            </Grid>
        </Grid>
            <FormControlLabel
                control={<Checkbox color="secondary" name="payment-terms-and-conditions" value="yes" />}
                label="Checkbox to agree terms and conditions"
            />
        </React.Fragment>
    )
}