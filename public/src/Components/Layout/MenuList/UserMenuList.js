import React from 'react'
import {
    MenuItem
} from '@mui/material'

export default function UserMenuList(props) {
    return (
        <div>
            <MenuItem onClick={props.signOut}>Sign out</MenuItem>
            <MenuItem onClick={() => props.handleSelected('products-list')}>Products list(as user)</MenuItem>
            <MenuItem onClick={() => props.handleSelected('user-orders')}>Orders</MenuItem>
            <MenuItem onClick={() => props.handleSelected('cart')}>Cart</MenuItem>
        </div>
    )
}
