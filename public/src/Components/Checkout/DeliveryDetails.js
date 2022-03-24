import React from 'react'
import {
    Grid,
    Typography,
} from '@mui/material'

export default function DeliveryDetails(props) {
    return (
        <div>
            <Grid item>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            id="firstName"
                            fullWidth
                        >
                            First name: {props.state.firstName === '' && !props.user ? props.state.firstName : props.user.firstName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            id="lastName"
                            fullWidth
                        >
                            Last name: {props.state.lastName ? props.state.lastName : props.user.lastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography
                            id="number"
                            fullWidth
                        >
                            Number: {props.state.number ? props.state.number : props.user.address.number}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography
                            id="address1"
                            fullWidth
                        >
                            Line 1: {props.state.address1 ? props.state.address1 : props.user.address.line1}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            id="address2"
                            fullWidth
                        >
                            Line 2: {props.state.address2 ? props.state.address2 : props.user.address.line2}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            id="city"
                            fullWidth
                        >
                            City: {props.state.city ? props.state.city : props.user.address.city}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            id="region"
                            fullWidth
                        >
                            Region: {props.state.region ? props.state.region : props.user.address.region}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            id="postcode"
                            fullWidth
                        >
                            Postcode: {props.state.postcode ? props.state.postcode : props.user.address.postcode}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            id="country"
                            fullWidth
                        >
                            Country: {props.state.country ? props.state.country : props.user.address.country}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
