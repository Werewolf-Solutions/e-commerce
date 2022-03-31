import React from 'react'
import {
    Card,
    CardContent,
    Typography,
    Button
} from '@mui/material'
import axios from 'axios'

export default function OrderCard(props) {
    const acceptOrder = async () => {
        console.log(props.order)
        let res = await axios.post('/users/accept-order', {order: props.order})
        console.log(res.data)
        props.updateUser()
    }

    const declineAndRefundOrder = async () => {
        console.log(props.order)
        let res = await axios.post('/users/decline-order', {order: props.order})
        console.log(res.data)
        props.updateUser()
    }
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Date
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.order.date}
                    </Typography>
                    {props.user.admin
                    ?
                    <div>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            User id: {props.order.orderedBy}
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
                            Order id: {props.order._id}
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
                        {props.order.payment_intent.status},
                        {props.order.payment_intent.card ? props.order.payment_intent.card.last4 : props.order.payment_intent.payment_method}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Accepted: {props.order.accepted ? 'yes' : 'not'}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Delivered: {props.order.delivered ? 'yes' : 'not'}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Status: {props.order.status ? props.order.status : 'to be accepted'}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Total amount: {props.order.total_amount/100} {props.currency}
                    </Typography>
                    <Button
                        onClick={() => props.handleItemsDialog(props.order.items)}
                    >items</Button>
                    <Button
                        onClick={() => props.handleMessagesDialog(props.order)}
                    >Messages</Button>
                </CardContent>
            </Card>
        </div>
    )
}
