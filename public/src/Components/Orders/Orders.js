import React from 'react'
import {
    Grid,
    Button,
    Card,
    CardContent,
    Typography
} from '@mui/material'
import UserOrders from './UserOrders'
import AdminUsersOrders from './AdminUsersOrders'
import ItemsDialog from './ItemsDialog'
import MessagesDialog from './MessagesDialog'

export default function Orders(props) {
    const [itemsDialog, setItemsDialog] = React.useState(false)
    const [messagesDialog, setMessagesDialog] = React.useState(false)
    const [messages, setMessages] = React.useState([])
    const [items, setItems] = React.useState([])

    const handleItemsDialog = (items) => {
        if (!itemsDialog) {
            setItems(items)
        }
        setItemsDialog(!itemsDialog)
    }

    const handleMessagesDialog = (messages) => {
        if (!messagesDialog) {
            setMessages(messages)
        }
        setMessagesDialog(!messagesDialog)
    }

    return (
        <div>
            <ItemsDialog
                open={itemsDialog}
                onClose={handleItemsDialog}
                items={items}
            />
            <MessagesDialog
                open={messagesDialog}
                onClose={handleMessagesDialog}
                messages={messages}
            />
            {props.user
            ? props.user.admin
                ? '<AdminUsersOrders orders={props.user.orders}/>'
                : '<UserOrders orders={props.user.orders}/>'
            : 'Loading'
            }
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {props.user
                ? props.user.orders.map(order => (
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                {props.user.admin
                                ?
                                <div>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        User id: {order.user_id}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Order id: {order._id}
                                    </Typography>
                                </div>
                                :
                                <div>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Order id: {order.order_id}
                                    </Typography>
                                </div>
                                }
                                <Typography variant="h5" component="div">
                                    Address details
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {order.address.postcode}, {order.address.number}, {order.address.line1}, {order.address.city}, {order.address.region}, {order.address.country}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Payment details
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {order.payment_intent.status}, {'payment method'},
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Accepted: {order.accepted ? 'yes' : 'not'}
                                </Typography>
                                <Button
                                    onClick={() => handleItemsDialog(order.items)}
                                >items</Button>
                                <Button
                                    onClick={() => handleMessagesDialog(order.modifications)}
                                >Messages</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                : null}
            </Grid>
        </div>
    )
}
