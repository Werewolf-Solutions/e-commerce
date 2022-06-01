import React from 'react'
import {
    Typography,
    Dialog
} from '@mui/material'

export default function CartDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                {props.cart.length != 0
                ? 
                    props.cart.map(item => (
                        <div>
                            <Typography>Name: {item.name}</Typography>
                            <Typography>Quantity: {item.quantity}</Typography>
                        </div>
                    ))
                : 'cart empty'
                }
            </Dialog>
        </div>
    )
}
