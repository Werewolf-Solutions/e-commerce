import React from 'react'
import { Dialog } from '@mui/material'
import CheckoutForm from './CheckoutForm'

export default function CheckoutDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <CheckoutForm
                    user={props.user}
                    updateUser={props.updateUser}
                    handleSignInDialog={props.handleSignInDialog}
                    cart={props.cart}
                    onClose={props.onClose}
                    emptyCart={props.emptyCart}
                    currency={props.currency}
                />
            </Dialog>
        </div>
    )
}