import React, {useEffect} from 'react'
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
    FormControlLabel,
    TextField,
    Typography,
    Grid
} from '@mui/material'
import DeliveryForm from './DeliveryForm'
import AddressCard from './AddressCard'

export default function AddressForm(props) {
    const [deliveryFormDialog, setDeliveryFormDialog] = React.useState(false)

    const handleDeliveryFormDialog = () => {
        setDeliveryFormDialog(!deliveryFormDialog)
    }

    useEffect(() => {
        // console.log(props.state)
        // console.log(props.user)
    }, [])
    return (
        <div>
            <DeliveryForm
                open={deliveryFormDialog}
                onClose={handleDeliveryFormDialog}
                user={props.user}
                update={props.update}
            />
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="select-shipping-method">Shipping method</InputLabel>
                <Select
                    labelId="select-shipping-method"
                    id="dselect-shipping-method"
                    value={props.shippingMethod}
                    label="Shipping method"
                    onChange={props.handleShippingMethodSelect}
                >
                    <MenuItem value={'delivery'}>Delivery</MenuItem>
                    <MenuItem value={'pick-up'}>Pick up</MenuItem>
                </Select>
            </FormControl>
            {props.user
            ?
                props.shippingMethod === 'delivery'
                ?
                <div className="container">
                    <AddressCard
                        user={props.user}
                        handleDeliveryFormDialog={handleDeliveryFormDialog}
                    />
                    <Button size="small" onClick={handleDeliveryFormDialog}>Use another address</Button>
                </div>
                : null
            : null
            }
            {!props.user && props.shippingMethod === 'delivery'
            ?
            <div>
                <Grid item>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                autoComplete="email"
                                variant="standard"
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="first-name"
                                variant="standard"
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="last-name"
                                variant="standard"
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                required
                                id="number"
                                name="number"
                                label="Number"
                                fullWidth
                                autoComplete="shipping address-number"
                                variant="standard"
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address line"
                                fullWidth
                                autoComplete="shipping address-line"
                                variant="standard"
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-city"
                                variant="standard"
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="postcode"
                                name="postcode"
                                label="Postcode"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                                onChange={props.handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            : !props.user && props.shippingMethod === 'pick-up'
                ?
                <div>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                            variant="standard"
                            onChange={props.handleChange}
                        />
                    </Grid>
                </div>
                : null
            }
        </div>
    )
}
