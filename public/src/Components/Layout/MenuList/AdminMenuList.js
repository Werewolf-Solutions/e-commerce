import React from 'react'
import {
    MenuItem
} from '@mui/material'

export default function AdminMenuList(props) {
    return (
        <div>
            <MenuItem onClick={props.signOut}>Sign out</MenuItem>
            <MenuItem onClick={() => props.handleSelected('products')}>Products list(as admin)</MenuItem>
            <MenuItem onClick={() => props.handleSelected('orders')}>Users' orders</MenuItem>
            <MenuItem onClick={() => props.handleSelected('account')}>Account</MenuItem>
        </div>
    )
}
