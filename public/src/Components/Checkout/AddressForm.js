import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@mui/material'

export default function AddressForm(props) {
    useEffect(() => {
        console.log(props.state)
        console.log(props.user)
    }, [])
    return (
        <div>
            {/* <React.Fragment> */}
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
                    <Grid item>
                        <Grid container spacing={3}>            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="first-name"
                                    variant="standard"
                                    value={props.state.firstName === '' && !props.user ? props.state.firstName : props.user.firstName}
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
                                    value={props.state.lastName ? props.state.lastName : props.user.lastName}
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
                                    value={props.state.number ? props.state.number : props.user.address.number}
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
                                    value={props.state.address1 ? props.state.address1 : props.user.address.line1}
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
                                    value={props.state.address2 ? props.state.address2 : props.user.address.line2}
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
                                    value={props.state.city ? props.state.city : props.user.address.city}
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
                                    value={props.state.region ? props.state.region : props.user.address.region}
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
                                    value={props.state.postcode ? props.state.postcode : props.user.address.postcode}
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
                                    value={props.state.country ? props.state.country : props.user.address.country}
                                    onChange={props.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                    label="Use this address for payment details"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                : null
            : 
                <div>
                    <button onClick={props.handleSignInDialog}>sign in / sign up</button>
                </div>
            }<br/>
            {!props.user && props.shippingMethod === 'delivery'
            ?
            <div>
                <Grid item>
                    <Grid container spacing={3}>            
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
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                label="Use this address for payment details"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            : null
            }
            {/* </React.Fragment> */}
        </div>
    )
}