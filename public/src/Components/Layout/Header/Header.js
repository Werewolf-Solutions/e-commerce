import React from 'react'
import {
    Grid,
    Switch,
    FormControlLabel,
    FormGroup
} from '@mui/material'
import MenuList from '../MenuList/MenuList'
import Logo from './Logo'
import CheckoutDialog from '../../Checkout/CheckoutDialog'
import CurrencySelect from './CurrencySelect'

export default function Header(props) {
    const [checkoutDialog, setCheckoutDialog] = React.useState(false)

    const handleCheckoutDialog = () => {
        if (props.cart.length === 0) {
            console.log("Cart is empty. Don't open checkout dialog")
            // TODO: message pop up
        } else {
            setCheckoutDialog(!checkoutDialog)
        }
    }

    return (
        <div className="Header">
            <CheckoutDialog
                open={checkoutDialog}
                onClose={handleCheckoutDialog}
                user={props.user}
                updateUser={props.updateUser}
                handleSignInDialog={props.handleSignInDialog}
                cart={props.cart}
                emptyCart={props.emptyCart}
            />
            <MenuList
                user={props.user}
                menuList={props.menuList}
                handleMenuList={props.handleMenuList}
                anchorEl={props.anchorEl}
                signOut={props.signOut}
                handleSelected={props.handleSelected}
                handleSignInDialog={props.handleSignInDialog}
                handleSignUpDialog={props.handleSignUpDialog}
            />
            <Logo />
            Total cart: {props.cart.total_cart ? props.cart.total_cart : 0}
            <button onClick={handleCheckoutDialog}>checkout</button>
            <button
                id="menu-list-button"
                className="Menu-button"
                onClick={props.handleMenuList}
            >menu</button>
            <FormGroup>
                <FormControlLabel
                    control={<Switch
                                checked={props.demo}
                                onChange={props.handleDemoOnOff}
                            />}
                    label={props.demo ? 'Demo' : 'Live'}
                />
            </FormGroup>
            <CurrencySelect />
        </div>
    )
}
