import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@mui/material'
import { Button } from '@mui/material'

export default function PaymentForm(props) {
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Choose payment method
        </Typography>
        <FormControl fullWidth>
            <InputLabel id="select-payment-method">Payment method</InputLabel>
            <Select
                labelId="select-payment-method"
                id="dselect-payment-method"
                value={props.paymentMethod}
                label="Payment method"
                onChange={props.handlePaymentMethodSelected}
            >
                <MenuItem value={'cash'}>Cash</MenuItem>
                <MenuItem value={'card'}>Card</MenuItem>
            </Select>
        </FormControl>
        {props.addPaymentMethod
        ? 
            <div>
                <button onClick={props.handleAddPaymentMethod}>close payment form</button><br/><br/>
                <FormControl fullWidth>
                    <InputLabel id="select-payment-method">Payment method</InputLabel>
                    <Select
                        labelId="select-payment-method"
                        id="dselect-payment-method"
                        value={props.paymentMethod}
                        label="Payment method"
                        onChange={props.handlePaymentMethodSelected}
                    >
                        <MenuItem value={'cash'}>Cash</MenuItem>
                        <MenuItem value={'card'}>Card</MenuItem>
                    </Select>
                </FormControl>
                {props.paymentMethod === 'card'
                ?
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardName"
                                label="Name on card"
                                fullWidth
                                autoComplete="cc-name"
                                variant="standard"
                                value={props.state.cardName}
                                onChange={props.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                variant="standard"
                                value={props.state.cardNumber}
                                onChange={props.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="expMonth"
                                label="Expiry month"
                                fullWidth
                                autoComplete="cc-exp"
                                variant="standard"
                                value={props.state.expMonth}
                                onChange={props.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="expYear"
                                label="Expiry year"
                                fullWidth
                                autoComplete="cc-exp"
                                variant="standard"
                                value={props.state.expYear}
                                onChange={props.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvc"
                                label="CVC"
                                helperText="Last three digits on signature strip"
                                fullWidth
                                autoComplete="cc-csc"
                                variant="standard"
                                value={props.state.cvc}
                                onChange={props.handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    onClick={props.createPaymentMethod}
                                >add card</Button>
                            </Grid>
                        </Grid>
                    </div>
                : null}
            </div>
        : <button onClick={props.handleAddPaymentMethod}>add payment method</button>
        }
        {props.user
        ?
            props.user.payment_methods.length != 0
            ?
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="select-card">Choose an existing card</InputLabel>
                        <Select
                            labelId="select-card"
                            id="dselect-card"
                            value={props.card}
                            label="Card"
                            onChange={props.handleCardSelected}
                        >
                            {props.user.payment_methods.map(pm => (
                                <MenuItem key={pm.id} value={pm.id}>xxxx-xxxx-4242</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            : null            
        : null
        }
        </React.Fragment>
    )
}