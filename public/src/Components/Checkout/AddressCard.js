import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
)

export default function OutlinedCard(props) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card
                variant="outlined"
            >
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Address details
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.user.address.number}{bull}
                        {props.user.address.line1}{bull}
                        {props.user.address.city}{bull}
                        {props.user.address.region}{bull}
                        {props.user.address.country}{bull}
                        {props.user.address.postcode}{bull}
                    </Typography><br/><br/>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        First and Last name
                    </Typography>
                    <Typography variant="body2">
                        {props.user.firstName}{bull}{props.user.lastName}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={props.handleAddressFormDialog}>Use another address</Button>
                </CardActions>
            </Card>
        </Box>
    )
}