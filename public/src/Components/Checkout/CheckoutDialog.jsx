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
                    cart={props.cart}
                    onClose={props.onClose}
                    currency={props.currency}
                    totalAmount={props.totalAmount}
                    update={props.update}
                    emptyCart={props.emptyCart}
                />
            </Dialog>
        </div>
    )
}