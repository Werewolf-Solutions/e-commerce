import React from 'react'
import {
    MenuItem
} from '@mui/material'

export default function UserMenuList(props) {
    return (
        <div>
            <MenuItem onClick={props.signOut}>Sign out</MenuItem>
            <MenuItem onClick={() => props.handleSelected('products')}>Products list(as user)</MenuItem>
            <MenuItem onClick={() => props.handleSelected('orders')}>Orders</MenuItem>
            <MenuItem onClick={() => props.handleSelected('cart')}>Cart</MenuItem>
            <MenuItem onClick={() => props.handleSelected('account')}>Account</MenuItem>
        </div>
    )
}
