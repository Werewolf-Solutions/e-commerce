import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../../Styles/admin-cards.css"

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
)

export default function AddressCard(props) {
    return (
        <div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                Address details
            </Typography>
            {props.user
            ?
                <div>
                    <Typography variant="h5" component="div">
                        {props.user.address.number}{bull}
                        {props.user.address.line1}{bull}
                        {props.user.address.city}{bull}
                        {props.user.address.region}{bull}
                        {props.user.address.country}{bull}
                        {props.user.address.postcode}
                    </Typography><br/><br/>
                </div>
            : null
            }
            {/* <Typography variant="body2">
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                First and Last name
            </Typography>
                {props.user
                ?
                <div>
                    {props.user.firstName}{bull}{props.user.lastName}
                </div>
                : null
                }
            </Typography> */}
        </div>
    )
}