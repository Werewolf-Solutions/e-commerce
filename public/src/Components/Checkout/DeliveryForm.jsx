import React from 'react'
import {
    Grid,
    TextField,
    Dialog
} from '@mui/material'
import { Button } from '@mui/material'

export default function DeliveryForm(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <Grid item>
                    <Grid container spacing={3}>
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
                        <Grid item>
                            <Button
                                onClick={props.editUser}
                            >
                                add address
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}