import React from 'react'
import {
    Dialog,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'

export default function AddPyamentMethodDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <FormControl>
                    <InputLabel id="select-payment-type">Payment type</InputLabel>
                    <Select
                        labelId="select-payment-type"
                        id="select-payment-type"
                        value={props.card ? props.card.type : ''}
                        label="Payment type"
                        onChange={props.handlePaymentTypeSelection}
                    >
                        <MenuItem value={'card'}>Card</MenuItem>
                    </Select>
                </FormControl><br/>
                <TextField
                    id='card_name'
                    label='Card name'
                    onChange={props.handleChange}
                /><br/>
                <TextField
                    id='card_number'
                    name='Card number'
                    label='Card number'
                    onChange={props.handleChange}
                /><br/>
                <TextField
                    id='exp_month'
                    name='Expire month'
                    label='Expire month'
                    onChange={props.handleChange}
                /><br/>
                <TextField
                    id='exp_year'
                    name='Expire year'
                    label='Expire year'
                    onChange={props.handleChange}
                /><br/>
                <TextField
                    id='cvc'
                    name='Cvc'
                    label='Cvc'
                    onChange={props.handleChange}
                /><br/>
                <button onClick={props.addPaymentMethod}>add payment method</button><br/>
                <button onClick={props.onClose}>close</button>
            </Dialog>
        </div>
    )
}
