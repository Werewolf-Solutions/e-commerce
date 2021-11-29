import React from 'react'
import {
    MenuItem
} from '@mui/material'

export default function AdminMenuList(props) {
    return (
        <div>
            <MenuItem onClick={props.signOut}>Sign out</MenuItem>
            <MenuItem onClick={() => props.handleSelected('admin-products-list')}>Products list(as admin)</MenuItem>
            <MenuItem onClick={() => props.handleSelected('admin-users-orders')}>Users' orders</MenuItem>
        </div>
    )
}
