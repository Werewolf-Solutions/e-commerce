import React from 'react'
import MenuList from '../MenuList/MenuList'

export default function Header(props) {    
    return (
        <div className="Header">
            <MenuList
                user={props.user}
                menuList={props.menuList}
                handleMenuList={props.handleMenuList}
                anchorEl="menu-list-button"
                handleSignInDialogForm={props.handleSignInDialogForm}
                handleSignUpDialogForm={props.handleSignUpDialogForm}
                signOut={props.signOut}
                handleSelected={props.handleSelected}
            />
            Logo
            <button
                id="menu-list-button"
                className="Menu-button"
                onClick={props.handleMenuList}
            >menu</button>
        </div>
    )
}
