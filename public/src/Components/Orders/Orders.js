import React from 'react'
import {
    Grid,
    Button,
    Card,
    CardContent,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel
} from '@mui/material'
import UserOrders from './UserOrders'
import AdminUsersOrders from './AdminUsersOrders'
import ItemsDialog from './ItemsDialog'
import MessagesDialog from './MessagesDialog'
import OrderCard from './OrderCard'

export default function Orders(props) {
    const [itemsDialog, setItemsDialog] = React.useState(false)
    const [messagesDialog, setMessagesDialog] = React.useState(false)
    const [onlyActive, setOnlyActive] = React.useState(false)
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

    const handleOnlyActive = () => {
        setOnlyActive(!onlyActive)
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
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox
                                checked={onlyActive}
                                onChange={handleOnlyActive}
                            />}
                    label='Show only active'
                />
            </FormGroup>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {props.user
                ? props.user.orders.map(order => (                    
                    <Grid item xs={6}>
                        {onlyActive
                        ? !order.accepted
                            ? 
                            <OrderCard
                                user={props.user}
                                order={order}
                                handleItemsDialog={handleItemsDialog}
                                handleMessagesDialog={handleMessagesDialog}
                            />
                            : null
                        :
                        <OrderCard
                            user={props.user}
                            order={order}
                            handleItemsDialog={handleItemsDialog}
                            handleMessagesDialog={handleMessagesDialog}
                        />
                        }
                    </Grid>
                ))
                : null}
            </Grid>
        </div>
    )
}
