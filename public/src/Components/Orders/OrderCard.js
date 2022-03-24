import React from 'react'
import {
    Card,
    CardContent,
    Typography,
    Button
} from '@mui/material'

export default function OrderCard(props) {
    const acceptOrder = () => {
        console.log(props.order)
        // TODO: call endpoint
    }

    const declineAndRefundOrder = () => {
        console.log(props.order)
        // TODO: call endpoint
    }
    return (
        <div>
            <Card>
                <CardContent>
                    {props.user.admin
                    ?
                    <div>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            User id: {props.order.user_id}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Order id: {props.order._id}
                        </Typography>
                        <Button
                            onClick={acceptOrder}
                        >Accept</Button>
                        <Button
                            onClick={declineAndRefundOrder}
                        >Decline/refund</Button>
                    </div>
                    :
                    <div>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Order id: {props.order.order_id}
                        </Typography>
                    </div>
                    }
                    <Typography variant="h5" component="div">
                        Address details
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.order.address.postcode}, {props.order.address.number}, {props.order.address.line1}, {props.order.address.city}, {props.order.address.region}, {props.order.address.country}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Payment details
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.order.payment_intent.status}, {'payment method'},
                    </Typography>
                    <Typography variant="h5" component="div">
                        Accepted: {props.order.accepted ? 'yes' : 'not'}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Delivered: {props.order.delivered ? 'yes' : 'not'}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Total amount: {props.order.total_amount/100} {props.currency}
                    </Typography>
                    <Button
                        onClick={() => props.handleItemsDialog(props.order.items)}
                    >items</Button>
                    <Button
                        onClick={() => props.handleMessagesDialog(props.order.modifications)}
                    >Messages</Button>
                </CardContent>
            </Card>
        </div>
    )
}
