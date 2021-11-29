import React from 'react'
import {
    Menu,
    MenuItem
} from '@mui/material'
import AdminMenuList from './AdminMenuList'
import UserMenuList from './UserMenuList'

export default function MenuList(props) {
    return (
        <div>
            <Menu
                open={props.menuList}
                onClose={props.handleMenuList}
                anchorEl={props.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {props.user
                ? props.user.admin
                    ?   <AdminMenuList
                            handleMenuList={props.handleMenuList}
                            handleSelected={props.handleSelected}
                            signOut={props.signOut}
                        />
                    :   <UserMenuList
                            handleMenuList={props.handleMenuList}
                            handleSelected={props.handleSelected}
                            signOut={props.signOut}
                        />
                : <div>
                    <MenuItem onClick={() => props.handleSelected('sign-in')}>Sign in</MenuItem>
                    <MenuItem onClick={() => props.handleSelected('sign-up')}>Sign up</MenuItem>
                    <MenuItem onClick={() => props.handleSelected('products-list')}>Products list</MenuItem>
                    <MenuItem onClick={() => props.handleSelected('cart')}>Cart</MenuItem>
                </div>
                }
            </Menu>
        </div>
    )
}
