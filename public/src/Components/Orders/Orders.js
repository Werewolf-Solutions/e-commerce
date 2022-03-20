import React from 'react'
import UserOrders from './UserOrders'
import AdminUsersOrders from './AdminUsersOrders'
import { Grid } from '@mui/material'

export default function Orders(props) {
    return (
        <div>
            {props.user
            ? props.user.admin
                ? '<AdminUsersOrders orders={props.user.orders}/>'
                : '<UserOrders orders={props.user.orders}/>'
            : 'Loading'
            }
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {props.user
                ? props.user.orders.map(order => (
                    <div>
                        <Grid item xs={6}>
                            Order id: {order.order_id}<br/>
                            Postcode: {order.address.postcode}<br/>
                            Accepted: {order.accepted ? 'yes' : 'not'}<br/>
                            {order.items.map(item => (
                                <div>
                                    Category: {item.category}<br/>
                                    Name: {item.name}<br/>
                                    Price: {item.price}<br/>
                                    Description: {item.description}<br/>
                                    Quantity: {item.quantity}
                                </div>
                            ))}
                        </Grid>
                    </div>
                ))
                : null}
            </Grid>
        </div>
    )
}
