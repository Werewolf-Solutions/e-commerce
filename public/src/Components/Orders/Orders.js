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

export default function Orders(props) {
    const [itemsDialog, setItemsDialog] = React.useState(false)
    const [items, setItems] = React.useState([])

    const handleItemsDialog = (items) => {
        if (!itemsDialog) {
            setItems(items)
        }
        setItemsDialog(!itemsDialog)
    }

    return (
        <div>
            <ItemsDialog
                open={itemsDialog}
                onClose={handleItemsDialog}
                items={items}
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
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Order id: {order.order_id}<br/>
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Address details
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Postcode: {order.address.postcode}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Payment details
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Accepted: {order.accepted ? 'yes' : 'not'}<br/>
                                </Typography>
                                <Button
                                    onClick={() => handleItemsDialog(order.items)}
                                >items</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                : null}
            </Grid>
        </div>
    )
}
