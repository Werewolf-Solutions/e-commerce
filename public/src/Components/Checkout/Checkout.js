import React from 'react'
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'
import axios from 'axios'
import AddPyamentMethodDialog from './AddPyamentMethodDialog'

export default function Checkout(props) {
    const [addPaymentMethodDialog, setAddPaymentMethodDialog] = React.useState(false)
    const [paymentTypeSelected, setPaymentTypeSelected] = React.useState('')
    const [paymentSelected, setPaymentSelected] = React.useState('')
    const [state, setState] = React.useState({
        card_number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
    })

    const handleChange = (e) => {
        setState({...state, [e.target.id]: e.target.value})
    }

    const handlePaymentTypeSelection = (e) => {
        setPaymentTypeSelected(e.target.value)
    }
    
    const handlePaymentSelection = (e) => {
        setPaymentSelected(e.target.value)
    }

    const handleAddPaymentMethodDialog = () => {
        setAddPaymentMethodDialog(!addPaymentMethodDialog)
    }

    const addPaymentMethod = async () => {
        let {card_number, exp_month, exp_year, cvc} = state
        let card = {
            number: card_number,
            exp_month: exp_month,
            exp_year: exp_year,
            cvc: cvc,
        }
        let type = paymentTypeSelected
        let res = await axios.post('/users/add-payment-method', {type, card})
        console.log(res.data)
    }

    const checkout = async () => {
        console.log(props.cart)
        if (props.user) {
          // if user logged in
          if (props.user.payment_methods.length === 0) {
            // if there isn't a payment method
            // /add-payment-method
            console.log('user logged in ---> No payment method ---> Add a payment method first')
            // let res = await axios.post('/users/add-payment-method', {type, card})
            // console.log(res.data)
            // updateUser()
          } else {
            // if there is a payment method
            // /create-payment-intent
            console.log('user logged in ---> Payment method existing ---> Create payment intent')
            console.log(props.cart.total_cart)
            console.log(paymentSelected)
            let res = await axios.post('/users/create-payment-intent', {payment_method: paymentSelected, total_cart: props.cart.total_cart*100})
            console.log(res.data)
            let {paymentIntent} = res.data
            let response = await axios.post('/users/confirm-payment-intent', {payment_intent: paymentIntent})
            console.log(response.data)
            props.updateUser()
            props.handleSelected('user-orders')
          }
        } else {
          // open sign in / sign up
          console.log('user logged out or not existing -----> sign in/up')
          props.handleSignInDialog()
        }
    }
    return (
        <div>
            <AddPyamentMethodDialog
                open={addPaymentMethodDialog}
                onClose={handleAddPaymentMethodDialog}
                addPaymentMethod={addPaymentMethod}
                handleChange={handleChange}
                paymentTypeSelected={paymentTypeSelected}
                handlePaymentTypeSelection={handlePaymentTypeSelection}
            />
            Checkout<br/>
            Total cart: {props.cart.total_cart}<br/>
            {props.user
            ? 
                <div>
                    <FormControl>
                        <InputLabel id="select-payment-method">Payment method</InputLabel>
                        <Select
                            labelId="select-payment-method"
                            id="select-payment-method"
                            value={paymentSelected}
                            label="Payment method"
                            onChange={handlePaymentSelection}
                        >
                            {props.user.payment_methods.map(pm => (
                                <MenuItem key={pm.id} value={pm.id}>****{pm.id}</MenuItem>
                            ))}
                        </Select>
                    </FormControl><br/>
                    {props.user.payment_methods.map(pm => (
                        pm.id === paymentSelected
                        ? `Show payment method details for ${pm.id}`
                        : null
                    ))}<br/>
                <button onClick={handleAddPaymentMethodDialog}>add payment method</button><br/>
                <button onClick={checkout}>confirm checkout</button>
                </div>
            :
                <div>
                    Please sign in to confirm checkout<br/>
                    <button onClick={props.handleSignInDialog}>sign in</button>
                </div>
            }            
        </div>
    )
}
