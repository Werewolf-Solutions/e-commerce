import React, {useEffect} from 'react'
import Checkbox from '@mui/material/Checkbox'
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
        console.log(props.state)
        console.log(props.user)
    }, [])
    return (
        <div>
            <DeliveryForm
                open={deliveryFormDialog}
                onClose={handleDeliveryFormDialog}
                handleChange={props.handleChange}
                state={props.state}
                user={props.user}
                editUser={props.editUser}
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
                <div>
                    <AddressCard
                        user={props.user}
                        handleDeliveryFormDialog={handleDeliveryFormDialog}
                    />
                    <Button size="small" onClick={handleDeliveryFormDialog}>Use another address</Button>
                </div>
                : null
            : 
                <div>
                    <button onClick={props.handleSignInDialog}>sign in</button>
                </div>
            }<br/>
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
                                value={props.state.email}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                autoComplete="password"
                                variant="standard"
                                value={props.state.password}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password2"
                                name="password2"
                                label="Password2"
                                type="password"
                                fullWidth
                                autoComplete="password2"
                                variant="standard"
                                value={props.state.password2}
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
                                value={props.state.firstName}
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
                                value={props.state.lastName}
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
                                value={props.state.number}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                                value={props.state.address1}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                name="address2"
                                label="Address line 2"
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="standard"
                                value={props.state.address2}
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
                                value={props.state.city}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="region"
                                name="region"
                                label="Region"
                                fullWidth
                                variant="standard"
                                value={props.state.region}
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
                                value={props.state.postcode}
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
                                value={props.state.country}
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
                            value={props.state.email}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            autoComplete="password"
                            variant="standard"
                            value={props.state.password}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password2"
                            name="password2"
                            label="Password2"
                            type="password"
                            fullWidth
                            autoComplete="password2"
                            variant="standard"
                            value={props.state.password2}
                            onChange={props.handleChange}
                        />
                    </Grid>
                </div>
                : null
            }
        </div>
    )
}
