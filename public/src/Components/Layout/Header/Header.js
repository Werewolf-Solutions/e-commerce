import React from 'react'
import {
    Grid,
    Switch,
    FormControlLabel,
    FormGroup,
    Typography
} from '@mui/material'
import MenuList from '../MenuList/MenuList'
import Logo from './Logo'
import CheckoutDialog from '../../Checkout/CheckoutDialog'
import CurrencySelect from './CurrencySelect'
import ThemeSelect from './ThemeSelect'
import DemoSelect from './DemoSelect'
import { Paper } from '@mui/material'

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
        <div>
            <CheckoutDialog
                open={checkoutDialog}
                onClose={handleCheckoutDialog}
                user={props.user}
                updateUser={props.updateUser}
                handleSignInDialog={props.handleSignInDialog}
                cart={props.cart}
                emptyCart={props.emptyCart}
                currency={props.currency}
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
            <Grid container>
                <Grid item xs>
                    <Logo />
                </Grid>
                <Grid item xs>
                    <Typography>
                        Total cart: {props.cart.total_cart ? props.cart.total_cart : 0} {props.currency}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <button onClick={handleCheckoutDialog}>checkout</button>
                </Grid>
                <Grid item xs>
                    <DemoSelect
                        demo={props.demo}
                        handleDemo={props.handleDemo}
                    />
                </Grid>
                <Grid item xs>
                    <CurrencySelect
                        currency={props.currency}
                        handleCurrency={props.handleCurrency}
                    />
                </Grid>
                <Grid item xs>
                    <ThemeSelect
                        theme={props.theme}
                        handleTheme={props.handleTheme}
                    />
                </Grid>
                <Grid item xs>
                    <button
                        id="menu-list-button"
                        className="Menu-button"
                        onClick={props.handleMenuList}
                    >menu</button>
                </Grid>
            </Grid>
        </div>
    )
}
